module.exports = {
  '*.{js,ts,vue}': ['npx prettier --write', () => 'vue-tsc --noEmit', 'eslint --config .eslintrc.js'],
  '*.{css,vue,scss}': ['npx prettier --write', 'stylelint --config .stylelintrc.js'],
  // Make sure the selector does not overlap to prevent race conditions!
  '!*.{js,ts,vue,css,scss}': ['npx prettier --write'],
};
