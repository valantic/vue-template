'use strict';

const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const baseConfig = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      // TODO: add vue-loader
      {
        use: 'babel-loader',
        test: /\.js$/,
      }
    ]
  }
};

const devConfig = Object.assign({}, baseConfig);

const prodConfig = {};

module.exports = isProduction ? prodConfig : devConfig;