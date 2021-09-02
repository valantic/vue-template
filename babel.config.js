module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'entry',
      corejs: 3.8
    }],
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
  ]
};
