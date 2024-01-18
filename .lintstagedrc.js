export default {
  '*.{js,ts,vue}': [
    () => 'vue-tsc',
    'eslint --config .eslintrc.fix.cjs --fix',
  ],
  '*.{css,vue,scss}': [
    'stylelint --config .stylelintrc.fix.js --fix',
  ],
};
