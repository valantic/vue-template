module.exports = {
  '*.{js,ts,vue}': [
    () => 'vue-tsc',
    'eslint --config .eslintrc.fix.js --fix',
  ],
  '*.{css,vue,scss}': [
    'stylelint --config .stylelintrc.fix.js --fix',
  ],
};
