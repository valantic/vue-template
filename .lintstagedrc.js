module.exports = {
  '*.{js,ts,vue}': [
    () => 'vue-tsc --noEmit',
    'eslint --config .eslintrc.fix.js --fix',
  ],
  '*.{css,vue,scss}': [
    'stylelint --config .stylelintrc.fix.js --fix',
  ],
};
