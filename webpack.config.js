'use strict';

const path = require('path'); // Cross platform path resolver
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Script tag injector
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'); // Nicer CLI interface
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackMonitor = require('webpack-monitor');
const WebpackAutoInject = require('webpack-auto-inject-version');
const webpack = require('webpack');
const PostCssPipelineWebpackPlugin = require('postcss-pipeline-webpack-plugin');
const postCssCriticalSplit = require('postcss-critical-split');
const cssNano = require('cssnano');
const openInEditor = require('launch-editor-middleware');

module.exports = function(env = {}, options = {}) {
  // Flags
  const isProduction = (env.production || process.env.NODE_ENV === 'production') || false;
  const hasStyleguide = env.styleguide || false;
  const hasMessage = env.message || false;
  const hotReload = !isProduction;
  const isProfileBuild = (options.profile && options.json) || false;
  const hasWatcher = env.watch || false;

  const themes = {
    'theme-01': path.resolve(__dirname, 'app/setup/scss/themes/theme-01.scss'),
    'theme-02': path.resolve(__dirname, 'app/setup/scss/themes/theme-02.scss'),
    'theme-03': path.resolve(__dirname, 'app/setup/scss/themes/theme-03.scss'),
    'theme-04': path.resolve(__dirname, 'app/setup/scss/themes/theme-04.scss'),
    'theme-05': path.resolve(__dirname, 'app/setup/scss/themes/theme-05.scss'),
  };

  // Configuration
  const buildPath = path.resolve(__dirname, 'dist');
  const filePrefix = '';
  const devPort = 8080;
  const assetsSubDirectory = 'static/';
  const globalVariables = {
    'process.env': {
      NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'), // Needed by vendor scripts
      HAS_STYLEGUIDE: JSON.stringify(hasStyleguide)
    },
  };

  const host = '0.0.0.0';
  const prefix = filePrefix ? `${filePrefix}_` : '';
  const include = [
    path.resolve(__dirname, 'app'),
    path.resolve(__dirname, 'test'),
  ];

  if (!isProfileBuild && hasMessage) {
    const target = hasStyleguide
      ? 'Styleguide'
      : 'Production';

    // Print type of build (first value is log color)
    console.info('\x1b[36m%s\x1b[0m', '## Building for ' + target + ' ##');
  }

  function scssLoader() {
    const use = [
      {
        loader: 'css-loader', // Note: will also call postcss
        options: {
          sourceMap: !isProduction || hasStyleguide,
          minimize: false // TODO: isProduction
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: !isProduction || hasStyleguide,
        },
      },
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [
            './app/setup/scss/_variables.scss',
            './app/setup/scss/_functions.scss',
            './app/setup/scss/_mixins.scss',
          ]
        },
      },
    ];

    return ExtractTextPlugin.extract({ use });
  }

  function webpackStats() {
    const stats = {
      all: false,
      // List created files
      assets: true,
      // Show errors
      errors: true,
      // Show build time
      timings: true,
      // Show warnings
      warnings: true,
    };

    return !isProfileBuild ? stats : undefined;
  }

  function plugins() {
    const pluginCollection = [
      new webpack.DefinePlugin(globalVariables),
      new HtmlWebpackPlugin({ // Script tag injection
        inject: true,
        template: 'index.html',
        chunksSortMode: 'dependency',
        excludeChunks: Object.keys(themes),
      }),
      // extract css into its own file
      new ExtractTextPlugin({
        filename: assetsSubDirectory + `css/${prefix}[name].css?[chunkhash]`, // NOTE: postcss-pipeline currently does not support query hash (https://github.com/mistakster/postcss-pipeline-webpack-plugin/issues/30)
        // Setting the following option to `false` will not extract CSS from codesplit chunks.
        // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
        // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
        // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
        allChunks: true,
      })
    ];

    if (isProduction) {
      pluginCollection.push(new UglifyJsPlugin({
        test: /\.js($|\?)/i, // MUST be defined because of file has as query
        parallel: true,
        sourceMap: hasStyleguide,
      }));

      // split vendor js into its own file
      pluginCollection.push(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks(module) {
          // any required modules inside node_modules are extracted to vendor
          return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(
              path.join(__dirname, 'node_modules')
            ) === 0
          );
        }
      }));

      // extract webpack runtime and module manifest to its own file in order to
      // prevent vendor hash from being updated whenever app bundle is updated
      pluginCollection.push(new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity
      }));

      // Create webpack monitor snapshot
      pluginCollection.push(new WebpackMonitor({
        capture: !hasStyleguide,
        target: '../stats/monitor.json',
        launch: env && env.monitor
      }));

      // keep module.id stable when vender modules does not change
      pluginCollection.push(new webpack.HashedModuleIdsPlugin());

      // Create critical CSS
      pluginCollection.push(new PostCssPipelineWebpackPlugin({
        // provide an optional function to filter out unwanted CSS
        predicate: name => name.indexOf('app.css') > -1,
        suffix: 'critical',
        pipeline: [
          postCssCriticalSplit({
            output: 'critical',
          }),
          cssNano()
        ]
      }));

      // Create minimized CSS (Full css => incl. critical css)
      pluginCollection.push(new PostCssPipelineWebpackPlugin({
        suffix: '', // Defining an empty string makes it possible not create an additional file
        pipeline: [
          postCssCriticalSplit({
            'output': 'input',
          }),
          cssNano()
        ]
      }));

      // copy custom static assets
      pluginCollection.push(new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'static'),
          to: assetsSubDirectory, // TODO: is this correct? If yes, is .htaccess correct?
          ignore: ['.*']
        },
        {
          from: path.resolve(__dirname, 'static/.htaccess'),
        },
      ]));

      // enable scope hoisting
      pluginCollection.push(new webpack.optimize.ModuleConcatenationPlugin());

      // Note: version auto inject is currently not working with query hash (https://github.com/radswiat/webpack-auto-inject-version/issues/25)
      pluginCollection.push(new WebpackAutoInject({
        SILENT: true,
        components: {
          AutoIncreaseVersion: false,
          InjectAsComment: true,
          InjectByTag: true
        },
        componentsOptions: {
          InjectAsComment: {
            tag: 'Build version: {version} - {date}',
            dateFormat: 'dddd, mmmm d, yyyy, hh:MM:ss'
          }
        }
      }));
    } else {
      // pluginCollection.push(new StyleLintPlugin({ // TODO: add scss linting an re-enable
      //   context: 'app',
      //   files: [
      //     '**/*.vue',
      //     '**/*.scss',
      //   ],
      // }));

      pluginCollection.push(new webpack.NamedModulesPlugin()); // Hot Module Replacement
      pluginCollection.push(new webpack.HotModuleReplacementPlugin()); // Hot Module Replacement

      if (!hasStyleguide) {
        pluginCollection.push(new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`Your application is running on http://${host}:${devPort}.`],
          },
        }));
      }
    }

    return pluginCollection;
  }

  const baseConfig = {
    entry: {
      ...themes,
      app: [
        'babel-polyfill',
        path.resolve(__dirname, 'app/main.js')
      ],
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js', // Use 'vue.esm' when importing from 'vue'
        '@': path.join(__dirname, 'app'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include,
          options: {
            failOnError: isProduction, // TODO: prevent output on error
            emitWarning: !isProduction, // Keeps overlay from showing during development, because it's annoying
          },
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            // extractCSS can not be used because of scss
            // cssSourceMap can not be used because of scss
            hotReload,
            // If you have problems debugging vue-files in devtools,
            // set this to false - it *may* help
            // https://vue-loader.vuejs.org/en/options.html#cachebusting
            cacheBusting: false, // TODO: shouldn't this be true?
            loaders: {
              scss: scssLoader()
            }
          }
        },
        {
          test: /\.(scss|css)$/,
          use: scssLoader(),
        },
        {
          test: /\.js$/,
          use: 'babel-loader',
          include,
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                context: 'app/assets/',
                name: '[path]/[name].[ext]?[hash]',
                outputPath: `${assetsSubDirectory}img/`,
              },
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
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: assetsSubDirectory + 'media/[name].[ext]?[hash]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: assetsSubDirectory + 'fonts/[name].[ext]?[hash]'
          }
        },
        {
          test: /\.md$/,
          loader: 'vue-markdown-loader'
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
      child_process: 'empty',
    },
  };

  const devConfig = {
    output: {
      path: buildPath,
      filename: '[name].js',
      publicPath: '/',
    },
    // Other methods may be faster. @see https://webpack.js.org/configuration/devtool/#src/components/Sidebar/Sidebar.jsx
    devtool: 'eval-source-map',
    devServer: {
      clientLogLevel: 'error', // Removes ESLint warnings from console
      historyApiFallback: true, // Enables routing support
      host,
      port: devPort,
      hot: hotReload,
      compress: true,
      overlay: true,
      quiet: true, // Handled by FriendlyErrorsPlugin
      inline: true,
      before(app) {
        app.use('/__open-in-editor', openInEditor()); // Adds 'open in editor' support for Vue Inspector
      },
    },
    plugins: plugins(),
  };

  const prodConfig = {
    watch: hasWatcher,
    output: {
      path: buildPath,
      filename: `${assetsSubDirectory}js/${prefix}[name].js?[chunkhash]`,
      chunkFilename: `${assetsSubDirectory}js/${prefix}[name].js?[chunkhash]`,
      publicPath: '/', // Public path to 'dist' scope in production
    },
    // @see https://webpack.js.org/configuration/devtool/#src/components/Sidebar/Sidebar.jsx
    devtool: hasStyleguide ? 'source-map' : false,
    // Customizes build log
    stats: webpackStats(),
    // Warn about performance issues
    performance: {
      hints: hasStyleguide ? false : 'warning',
      maxEntrypointSize: 500000, // 500kb
      maxAssetSize: 150000, // 150kb
    },
    plugins: plugins(),
  };

  if (isProduction) {
    return Object.assign(baseConfig, prodConfig);
  }

  return Object.assign(baseConfig, devConfig);
};
