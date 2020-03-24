module.exports = {
  extends: '../../../.stylelintrc.js',
  rules: {
    'selector-class-pattern': null,
    'indentation': [
      2,
      {
        ignore: ["inside-parens"] // Stylelint seems to fail on maps
      }
    ]
  }
};
