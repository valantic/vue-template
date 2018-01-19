module.exports = {
  defaultExample: 'app/setup/styleguide.fallback.md',
  components: 'app/components/**/*.vue',
  styleguideDir: 'dist/styleguidist',
  showUsage: true,
  sections: [
    {
      name: 'Elements',
      components: 'app/components/**/e-*.vue'
    },
    {
      name: 'Components',
      components: 'app/components/**/c-!(styleguide*).vue'
    },
    {
      name: 'Styleguide',
      components: 'app/components/c-styleguide*.vue'
    }
  ],
  mixins: [
    './app/setup/styleguide.plugins'
  ]
};
