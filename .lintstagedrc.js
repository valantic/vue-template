// NOTE: 'concurrent' had to be disabled to allow prettier to apply code changes before linting.
module.exports = {
  '*.{js,ts,vue}': ['npx prettier --write', () => 'vue-tsc --noEmit', 'eslint --config .eslintrc.js'],
  '*.{css,vue,scss}': ['npx prettier --write', 'stylelint --config .stylelintrc.js'],
  // Make sure the selector does not overlap to prevent race conditions!
  '!*.{js,ts,vue,css,scss}': ['npx prettier --ignore-unknown --write'],
};
