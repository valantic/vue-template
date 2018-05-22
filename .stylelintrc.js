module.exports = {
  processors: ['postcss-html'],
  extends: 'stylelint-config-valantic',
  rules: {
    'indentation': [
      2,
      {
        ignore: ['inside-parens'] // Stylelint seems to fail on maps
      }
    ]
  }
};
