export default {
  // 1. Script files: Prettier first, then ESLint (fixes applied sequentially)
  '*.{js,ts}': ['prettier --write', 'eslint --fix'],

  // 2. Style files: Prettier first, then Stylelint (fixes applied sequentially)
  '*.{css,scss}': ['prettier --write', 'stylelint --config .stylelintrc.fix.js --fix'],

  // 3. Vue files: Prettier, then ESLint, then Stylelint (all in one go)
  '*.vue': ['prettier --write', 'eslint --fix', 'stylelint --config .stylelintrc.fix.js --fix'],

  // 4. Everything else: Just Prettier
  '!*.{js,ts,vue,css,scss}': ['prettier --ignore-unknown --write'],
};
