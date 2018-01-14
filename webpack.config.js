'use strict';

const path = require('path'); // Cross platform path resolver
const htmlWebpackPlugin = require('html-webpack-plugin'); // Script tag injector
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'); // Nicer CLI interface
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

const isProduction = process.env.NODE_ENV === 'production';
const host = 'localhost';
const port = 8080;
const hotReload = true;

function vueLoaderScss() {
  const use = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: !isProduction
      }
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: !isProduction
      }
    },
    {
      loader: 'sass-resources-loader',
      options: {
        resources: path.resolve(__dirname, 'app/setup/_scss.scss')
      }
    }
  ];

  if (!isProduction) {
    use.unshift('vue-style-loader')
  }

  return isProduction
    ? ExtractTextPlugin.extract({ use })
    : use;
}

/**
 * TODO: add ESLint
 * TODO: build js to /dist/js folder
 * TODO: add postcss
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
        include: [
          path.resolve(__dirname, 'app'),
        ],
        options: {
          // extractCSS can not be used because of scss
          // cssSourceMap can not be used because of scss
          hotReload,
          // If you have problems debugging vue-files in devtools,
          // set this to false - it *may* help
          // https://vue-loader.vuejs.org/en/options.html#cachebusting
          cacheBusting: false,
          loaders: {
            scss: vueLoaderScss()
          }
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
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
              name: '/static/img/[name].[hash:7].[ext]',
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
    hot: hotReload,
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
    // extract css into its own file
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash].css',
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    new htmlWebpackPlugin({ // Script tag injection
      inject: true,
      template: 'index.html'
    })
  ]
}, baseConfig);

module.exports = isProduction ? prodConfig : devConfig;