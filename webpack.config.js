// Basics
const path = require('path'); // Cross platform path resolver
const webpack = require('webpack');

// Development & build
const openInEditor = require('launch-editor-middleware');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Script tag injector
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'); // Nicer CLI interface
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = (env = {}, options = {}) => {
  // Instance variables
  const isProduction = ((options.mode || process.env.NODE_ENV) === 'production') || false;
  const hasStyleguide = !!options.styleguide;
  const hasWatcher = options.watch || false;
  const hotReload = !hasWatcher || !isProduction;
  const globalVariables = {
    'process.env': {
      NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'), // Needed by vendor scripts
      HAS_STYLEGUIDE: JSON.stringify(hasStyleguide),
      HAS_WATCHER: hasWatcher,
    },
  };

  // Project variables
  const buildPath = path.resolve(__dirname, 'dist');
  const publicPath = '/'; // Base path which is used in production to load modules via http.
  const outputAssetsFolder = 'assets/';
  const filePrefix = 'app';
  const themes = {
    'theme-01': path.resolve(__dirname, 'src/setup/scss/themes/theme-01.scss'),
    'theme-02': path.resolve(__dirname, 'src/setup/scss/themes/theme-02.scss'),
  };
  const devPort = hasStyleguide ? 6060 : 8080;
  const host = options.host !== 'localhost'
    ? options.host
    : '0.0.0.0'; // 0.0.0.0 is needed to allow remote access for testing

  // webpack configuration variables
  const prefix = filePrefix ? `${filePrefix}.` : '';
  const extensions = ['.js', '.vue', '.json'];
  const alias = {
    '@': path.join(__dirname, 'src'),
    vue$: 'vue/dist/vue.esm.js', // Use 'vue.esm' when importing from 'vue'
    swiper$: 'swiper/dist/js/swiper.js', // Use builded code from swiper when importing from 'swiper'
  };

  const scssResourcesFolder = './src/setup/scss/';
  const scssResources = [
    `_variables.scss`,
    `_config.scss`,
    `_functions.scss`,
    `_mixins.scss`,
    `_extends.scss`,
  ];

  const plugins = [
      new webpack.DefinePlugin(globalVariables), // Set node variables.

      new VueLoaderPlugin(), // *.vue file parser.
      new MiniCssExtractPlugin({ // Extract CSS code
        filename: outputAssetsFolder + `css/${prefix}[name].css${isProduction ? '?[chunkhash]' : ''}`,
      }),
      new HtmlWebpackPlugin({ // Script tag injection.
        inject: true,
        template: 'index.html',
        chunksSortMode: 'dependency',
        excludeChunks: isProduction // TODO: improve this...
          ? Object.keys(themes)
          : Object.keys(themes).slice(1, themes.length - 1),
      }),
      new StyleLintPlugin({
        emitErrors: isProduction,
        context: 'src',
        files: [
          '**/*.vue',
          '**/*.scss',
        ],
      }),
    ]
  ;

  if (isProduction) {
    plugins.push(new CleanWebpackPlugin({ // Cleans the dist folder before and after the build.
      cleanAfterEveryBuildPatterns: Object.keys(themes).map(theme => `./**/*${theme}.js`)
    }));
  }

  if (!isProduction || hasWatcher) {
    plugins.push(new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: !hasStyleguide
          ? [`Your application is running on http://${host === '0.0.0.0' ? 'localhost' : host}:${devPort}.`]
          : null,
      },
    }));
  }

  const svgoPlugins = [
    //{ cleanupAttrs: false, },
    //{ removeDoctype: false, },
    //{ removeXMLProcInst: false, },
    //{ removeComments: false, },
    //{ removeMetadata: false, },
    //{ removeTitle: false, },
    //{ removeDesc: false, },
    { removeUselessDefs: false },
    //{ removeEditorsNSData: false, },
    //{ removeEmptyAttrs: false, },
    //{ removeHiddenElems: false, },
    //{ removeEmptyText: false, },
    //{ removeEmptyContainers: false, },
    { removeViewBox: false, },
    //{ cleanUpEnableBackground: true, },
    //{ convertStyleToAttrs: true, },
    //{ convertColors: true, },
    //{ convertPathData: true, },
    //{ convertTransform: true, },
    //{ removeUnknownsAndDefaults: true, },
    //{ removeNonInheritableGroupAttrs: true, },
    //{ removeUselessStrokeAndFill: true, },
    //{ removeUnusedNS: true, },
    { cleanupIDs: false },
    //{ cleanupNumericValues: false, },
    //{ moveElemsAttrsToGroup: true, },
    //{ moveGroupAttrsToElems: true, },
    //{ collapseGroups: false, },
    //{ removeRasterImages: false, },
    //{ mergePaths: true, },
    //{ convertShapeToPath: true, },
    //{ sortAttrs: true, },
    //{ transformsWithOnePath: false, },
    //{ removeDimensions: true, }
  ];

  const devServer = {
    clientLogLevel: 'error', // Removes ESLint warnings from browser console
    historyApiFallback: true, // Enables routing support
    host,
    port: devPort,
    hot: hotReload,
    compress: true,
    overlay: true,
    quiet: true, // Handled by FriendlyErrorsPlugin
    inline: true,
    progress: true,
    before(app) {
      if (!hasStyleguide) {
        console.clear();
        console.log('\x1b[34m%s\x1b[0m', 'Starting development server...');
      }

      app.use('/__open-in-editor', openInEditor()); // Adds 'open in editor' support for Vue Inspector
    },
  };

  const rules = [
    {
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      options: {
        failOnError: isProduction,
        emitWarning: !isProduction, // Keeps overlay from showing during development, because it's annoying
        cache: !isProduction, // Improves linting performance
      },
    },
    {
      test: /\.js$/,
      // The excessive exclude are required to make vue-styleguidist work in IE11.
      exclude: /node_modules\/(?!(dom7|ssr-window|swiper|regexpu-core|unicode-match-property-ecmascript|unicode-match-property-value-ecmascript|acorn-jsx|@znck\/prop-types|chalk|react-dev-utils|strip-ansi|ansi-regex|ansi-styles)\/).*/,
      use: {
        loader: 'babel-loader',
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
      },
    },
    {
      test: /\.scss$/,
      use: [
        isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 2
          }
        },
        'postcss-loader', // See ./postcss.config.js for configuration.
        {
          loader: 'sass-loader',
          options: {
            sourceMap: false
          }
        },
        {
          loader: 'sass-resources-loader',
          options: {
            resources: scssResources.map(file => scssResourcesFolder + file),
          },
        },
      ],
    },
    {
      test: /\.styl$/, // Required for Vuetify
      use: [
        isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: !isProduction
          }
        },
        'postcss-loader', // See ./postcss.config.js for configuration.
        {
          loader: 'stylus-loader',
          options: {
            sourceMap: !isProduction
          },
        },
      ]
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // Required for Vuetify
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: outputAssetsFolder + 'fonts/[name].[ext]?[hash]',
      },
    },
    {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            context: 'src/assets/',
            name: '[path]/[name].[ext]?[hash]',
            outputPath: `${outputAssetsFolder}img/`,
          },
        },
        {
          loader: 'image-webpack-loader', // @see https://github.com/tcoopman/image-webpack-loader
          options: {
            svgo: {
              plugins: svgoPlugins
            },
          },
        },
      ],
    },
    {
      test: /\.md$/, // Required by styleguide.
      loader: [
        'vue-loader',
        {
          loader: 'vue-markdown-loader/lib/markdown-compiler',
          options: {
            raw: true
          }
        }
      ],
    },
  ];

  const optimization = {
      nodeEnv: false,
      minimizer: [
        new UglifyJsPlugin({
          test: /\.js($|\?)/i, // MUST be defined because file has as query
          cache: true,
          parallel: true,
          sourceMap: hasStyleguide
        })
      ],
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
          },
        }
      },
      runtimeChunk: {
        name: 'manifest'
      }
    };

  const stats = {
    all: false, // Fallback
    assets: true, // Show list of created files
    assetsSort: '!size', // Order list of created files by ...
    errors: true, // Show errors
    excludeAssets: /assets\/(img|fonts)/,
    hash: true, // Show build hash
    performance: true, // Show warnings for big files
    timings: true, // Show timing information
    warnings: true, // Show warnings
  };

  return {
    watch: hasWatcher,
    mode: isProduction ? 'production' : 'development',
    entry: {
      ...themes,
      app: [
        '@babel/polyfill',
        path.resolve(__dirname, 'src/main.js'),
      ]
    },
    resolve: {
      extensions,
      alias,
    },
    module: {
      rules,
    },
    stats: (!isProduction || hasWatcher) ? { all: false } : stats,
    performance: { // Warn about performance issues
      hints: (!isProduction || hasWatcher) ? false : 'warning',
      maxEntrypointSize: 500000, // 500kb
      maxAssetSize: 150000, // 150kb
    },
    output: {
      path: buildPath,
      filename: isProduction ? `${outputAssetsFolder}js/${prefix}[name].js?[chunkhash]` : '[name].js',
      chunkFilename: `${outputAssetsFolder}js/${prefix}[name].js?[chunkhash]`,
      publicPath,
    },
    watchOptions: {
      ignored: /node_modules/
    },
    plugins,
    optimization: isProduction ? optimization : {},
    devServer,
  };
};
