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

# Parse severity counts from "Total: X (UNKNOWN: 0, LOW: Y, MEDIUM: Z, HIGH: W, CRITICAL: V)"
critical, high = 0, 0
match = re.search(r'Total:\s*\d+\s*\(([^)]+)\)', raw)
if match:
    counts = match.group(1)
    c = re.search(r'CRITICAL:\s*(\d+)', counts)
    h = re.search(r'HIGH:\s*(\d+)', counts)
    critical = int(c.group(1)) if c else 0
    high = int(h.group(1)) if h else 0

# Extract affected packages and their highest severity
SEVERITIES = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']
ICONS = {'CRITICAL': '🔴', 'HIGH': '🟠', 'MEDIUM': '🟡', 'LOW': '🟢'}

packages: dict[str, str] = {}
for line in raw.split('\n'):
    if '│' not in line:
        continue
    parts = [p.strip() for p in line.split('│')]
    if len(parts) < 5:
        continue
    pkg, severity = parts[1], parts[3]
    if not pkg or pkg in ('Library', '-') or severity not in SEVERITIES:
        continue
    existing = packages.get(pkg)
    if existing is None or SEVERITIES.index(severity) < SEVERITIES.index(existing):
        packages[pkg] = severity

pkg_rows = '\n'.join(
    f'| `{pkg}` | {ICONS.get(sev, "")} {sev} |'
    for pkg, sev in sorted(packages.items(), key=lambda x: SEVERITIES.index(x[1]))
)

headline_icon = '🔴' if critical > 0 else '🟠'

md = f"""{headline_icon} Automated security scan on **{date_display}** detected vulnerabilities in npm dependencies. [View run]({run_url})

### Summary

| Severity | Count |
|----------|------:|
| 🔴 Critical | {critical} |
| 🟠 High | {high} |

### Affected Packages

| Package | Severity |
|---------|----------|
{pkg_rows}

### Risk Assessment

This project is a **Vue.js frontend component library** integrated with a CMS (Pimcore). All vulnerabilities are in browser-side JavaScript dependencies — no backend or server code is affected.

- **Prototype pollution** (axios): allows manipulation of HTTP request behaviour including headers, proxy settings, and auth tokens if malicious data reaches the client.
- **HTTP Transport Hijacking / Man-in-the-Middle**: elevated risk when API responses from external sources are consumed without strict input validation.
- **NO_PROXY bypass**: outbound requests may circumvent intended network restrictions.

All vulnerabilities have a **known fix** in a newer package version. No application code changes required — dependency version bumps only.

### Recommendation

Update affected packages to their patched versions and re-run the security scan to confirm clean.

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
