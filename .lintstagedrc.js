// NOTE: 'concurrent' had to be disabled to allow prettier to apply code changes before linting.
export default {
  '*.{js,ts,vue}': ['npx prettier --write', () => 'vue-tsc'],
  '*.{css,vue,scss}': ['npx prettier --write', 'stylelint --config .stylelintrc.fix.js --fix'],
  // Make sure the selector does not overlap to prevent race conditions!
  '!*.{js,ts,vue,css,scss}': ['npx prettier --ignore-unknown --write'],
};
