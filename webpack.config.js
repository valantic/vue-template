'use strict';

const path = require('path'); // Cross platform path resolver
const htmlWebpackPlugin = require('html-webpack-plugin'); // Script tag injector
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'); // Nicer CLI interface
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';
const host = 'localhost';
const port = 8080;

/**
 * TODO: add ESLint
 * TODO: build js to /dist/js folder
 */

const baseConfig = {
  entry: {
    app: path.resolve(__dirname, 'app/main.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js', // Use 'vue.esm' when importing from 'vue'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: { TODO: add scss loader
        //   loaders: {
        //
        //   }
        // }
      },
      {
        use: 'babel-loader',
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'app'),
          path.resolve(__dirname, 'test'),
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/assets/img/[name].[hash:7].[ext]',
            }
          },
          {
            loader: 'image-webpack-loader', // @see https://github.com/tcoopman/image-webpack-loader
            options: {
              svgo: {
                removeEmptyContainers: true,
              },
            }
          },
        ],
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};

const devConfig = Object.assign({
  devServer: {
    host,
    port,
    hot: true,
    compress: true,
    overlay: true,
    quiet: true, // Handled by FriendlyErrorsPlugin
  },
  plugins: [
    new htmlWebpackPlugin({ // Script tag injection
      inject: true,
      template: 'index.html'
    }),
    new webpack.NamedModulesPlugin(), // Hot Module Replacement
    new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running on http://${host}:${port}.`],
      },
    }),
  ]
}, baseConfig);

const prodConfig = Object.assign({
  plugins: [
    new htmlWebpackPlugin({ // Script tag injection
      inject: true,
      template: 'index.html'
    })
  ]
}, baseConfig);

module.exports = isProduction ? prodConfig : devConfig;