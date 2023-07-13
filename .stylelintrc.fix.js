module.exports = {
  extends: [
    'stylelint-config-valantic/fix',
    './.stylelintrc.js'
  ],
  overrides: [
    {
      files: ['src/styleguide/routes/**/*.*'],
      rules: {
        'selector-class-pattern': null,
      }
    }
  ]
};
