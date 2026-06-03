#!/usr/bin/env python3
"""
Generates a GitHub Issue body (Markdown) from Trivy table output.
Reads trivy-table.txt, writes issue-body.md.

Required env vars:
  REPO       - GitHub repository name (e.g. valantic/vue-template)
  RUN_URL    - Link to the GitHub Actions run
  SCAN_DATE  - ISO date string of the scan
"""

import os
import re
import sys

TRIVY_TABLE = 'trivy-table.txt'
OUTPUT_FILE = 'issue-body.md'

repo = os.environ.get('REPO', 'vue-template')
run_url = os.environ.get('RUN_URL', '#')
scan_date = os.environ.get('SCAN_DATE', '')
date_display = scan_date[:10] if scan_date else 'N/A'

try:
    with open(TRIVY_TABLE, 'r') as f:
        raw = f.read()
except FileNotFoundError:
    print(f'Error: {TRIVY_TABLE} not found', file=sys.stderr)
    sys.exit(1)

# --- Parse severity summary ---

critical, high = 0, 0
match = re.search(r'Total:\s*\d+\s*\(([^)]+)\)', raw)
if match:
    counts = match.group(1)
    c = re.search(r'CRITICAL:\s*(\d+)', counts)
    h = re.search(r'HIGH:\s*(\d+)', counts)
    critical = int(c.group(1)) if c else 0
    high = int(h.group(1)) if h else 0

# --- Parse individual vulnerabilities from the ASCII table ---

SEVERITIES = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']
ICONS = {'CRITICAL': '🔴', 'HIGH': '🟠', 'MEDIUM': '🟡', 'LOW': '🟢'}


SEP_CHARS = set('─━═├└┌┤┐┘┬┴┼╞╡')


def is_separator_cell(s: str) -> bool:
    return bool(s) and s[0] in SEP_CHARS


def is_vuln_id(s: str) -> bool:
    return s.startswith('CVE-') or s.startswith('GHSA-')


def advisory_url(cve: str, found_url: str) -> str:
    if found_url:
        return found_url
    if cve.startswith('CVE-'):
        return f'https://avd.aquasec.com/nvd/{cve.lower()}'
    if cve.startswith('GHSA-'):
        return f'https://github.com/advisories/{cve}'
    return ''


vulns: list[dict] = []
current_pkg = ''
current_severity = ''
current_vuln: dict | None = None

for line in raw.split('\n'):
    if '│' not in line:
        continue
    parts = [p.strip() for p in line.split('│')]
    if len(parts) < 3:
        continue

    col = lambda i: parts[i] if i < len(parts) else ''  # noqa: E731

    # Skip table headers and separator rows
    if is_separator_cell(col(1)) or col(1) == 'Library':
        continue
    if is_separator_cell(col(2)):
        continue

    # Track current package (non-empty, non-separator)
    if col(1) and not is_separator_cell(col(1)):
        current_pkg = col(1)

    # Track current severity (inherited across CVEs of same package)
    if col(3) in SEVERITIES:
        current_severity = col(3)

    if is_vuln_id(col(2)):
        if current_vuln:
            vulns.append(current_vuln)
        current_vuln = {
            'pkg':       current_pkg,
            'cve':       col(2),
            'severity':  col(3) if col(3) in SEVERITIES else current_severity,
            'status':    col(4),
            'installed': col(5),
            'fixed':     col(6),
            'title':     col(7),
            'url':       '',
        }
    elif current_vuln and col(7) and not is_separator_cell(col(7)):
        # Continuation line: URL or title wrap
        if col(7).startswith('http'):
            current_vuln['url'] = col(7)
        elif not current_vuln['url']:
            current_vuln['title'] = (current_vuln['title'] + ' ' + col(7)).strip()

if current_vuln:
    vulns.append(current_vuln)

# --- Group by package ---

from collections import defaultdict
by_pkg: dict[str, list[dict]] = defaultdict(list)
for v in vulns:
    by_pkg[v['pkg']].append(v)

# Sort packages by worst severity
def worst_severity(pkg_vulns: list[dict]) -> int:
    return min(SEVERITIES.index(v['severity']) for v in pkg_vulns if v['severity'] in SEVERITIES)

sorted_pkgs = sorted(by_pkg.items(), key=lambda x: worst_severity(x[1]))

# --- Build Markdown sections ---

headline_icon = '🔴' if critical > 0 else '🟠'
security_tab_url = f'https://github.com/{repo}/security/code-scanning'
fingerprint = ','.join(sorted(v['cve'] for v in vulns))

with open('vuln-fingerprint.txt', 'w') as f:
    f.write(fingerprint)

summary_rows = '\n'.join([
    f'| 🔴 Critical | {critical} |',
    f'| 🟠 High | {high} |',
])

details_sections = ''
for pkg, pkg_vulns in sorted_pkgs:
    installed = pkg_vulns[0]['installed']
    # Collect all unique fixed versions across CVEs for this package
    fixed_versions = sorted({
        v.strip()
        for vuln in pkg_vulns
        for v in vuln['fixed'].split(',')
        if v.strip()
    })
    fixed_str = ', '.join(fixed_versions) if fixed_versions else 'n/a'

    details_sections += f'\n#### `{pkg}`\n\n'
    details_sections += f'Installed: `{installed}` → Fix available: `{fixed_str}`\n\n'
    details_sections += '| Advisory | Severity | Title |\n'
    details_sections += '|----------|----------|-------|\n'

    for vuln in sorted(pkg_vulns, key=lambda v: SEVERITIES.index(v['severity']) if v['severity'] in SEVERITIES else 99):
        url = advisory_url(vuln['cve'], vuln['url'])
        cve_link = f'[{vuln["cve"]}]({url})' if url else vuln['cve']
        icon = ICONS.get(vuln['severity'], '')
        title = vuln['title'].strip()
        # Trim title at first sentence or 80 chars to keep table readable
        if len(title) > 80:
            title = title[:77].rstrip() + '…'
        details_sections += f'| {cve_link} | {icon} {vuln["severity"]} | {title} |\n'

md = f"""<!-- vuln-fingerprint: {fingerprint} -->
{headline_icon} Automated security scan on **{date_display}** detected vulnerabilities in npm dependencies.

[View GitHub Actions run]({run_url}) · [View Security Code Scanning]({security_tab_url})

### Summary

| Severity | Count |
|----------|------:|
{summary_rows}

### Vulnerability Details
{details_sections}
### Recommendation

Update affected packages to their patched versions and re-run the security scan to verify.

---

<details>
<summary>Full Trivy scan output</summary>

```
{raw.strip()}
```

</details>
"""

with open(OUTPUT_FILE, 'w') as f:
    f.write(md)

print(f'Issue body written to {OUTPUT_FILE} (critical={critical}, high={high})')
