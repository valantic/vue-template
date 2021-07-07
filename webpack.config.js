/* eslint-disable no-console */

// Basics
const path = require('path'); // Cross platform path resolver
const webpack = require('webpack');

// Development & build
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const openInEditor = require('launch-editor-middleware');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Script tag injector
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'); // Nicer CLI interface
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const { webpack: config } = require('./package.json');
const chokidar = require('chokidar');
const TerserPlugin = require('terser-webpack-plugin');

/**
 * A note about [hash]: Using the hash in query could cause troubles with caching proxies. Therefore
 * it is recommended to use build hashes only on file names, not as an url query!
 */

/**
 * Creates a webpack configuration based on the current environment and arguments.
 *
 * @param {String|Object} env - The currently active environment.
 * @param {Object} args - An Object of additional arguments.
 *
 * @returns {Object}
 */
module.exports = (env, args = {}) => {
  // Instance variables
  const isStyleguideBuild = !!args.styleguideBuild;
  const isProduction = process.env.NODE_ENV === 'production' && !isStyleguideBuild;
  const hasWatcher = args.watch || false;
  const hotReload = !hasWatcher || !isProduction;
  const showProfile = args.profile || false;
  const globalVariables = {
    'process.env': {
      'NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'), // Needed by vendor scripts
      'IS_STYLEGUIDE_BUILD': JSON.stringify(isStyleguideBuild),
      'HAS_WATCHER': hasWatcher,
      'BUILD_TIMESTAMP': new Date().getTime(),
    },
    '__VUE_OPTIONS_API__': true,
    '__VUE_PROD_DEVTOOLS__': true, // TODO: make false by default.
    '__VUE_I18N_FULL_INSTALL__': true,
    '__VUE_I18N_LEGACY_API__': true,
    '__INTLIFY_PROD_DEVTOOLS__': true,
  };

  // Project variables
  const {
    buildPath,
    productionPath,
    localDist,
    styleguideBuildPath,
    styleguidePath,
    developmentPath,
    outputAssetsFolder,
    filePrefix,
    themeSource,
    themeFiles,
    devPort,
  } = config;

  const publicPath = isProduction // Base path which is used in production to load modules via http.
    ? productionPath
    : isStyleguideBuild ? styleguidePath : developmentPath;
  const themes = themeFiles.reduce((accumulator, theme) => {
    accumulator[theme] = path.resolve(__dirname, `${themeSource}${theme}.scss`);

    return accumulator;
  }, {});
  const host = args.host && args.host !== 'localhost'
    ? args.host
    : '0.0.0.0'; // 0.0.0.0 is needed to allow remote access for testing
  const outputPath = process.env.WEBPACK_LOCAL_DIST
    ? localDist
    : isStyleguideBuild
      ? styleguideBuildPath
      : buildPath;

  // webpack configuration variables
  const prefix = filePrefix ? `${filePrefix}.` : '';
  const extensions = ['.js', '.vue', '.json'];
  const alias = {
    '@': path.resolve(__dirname, './src'),
    'vue$': 'vue/dist/vue.esm-bundler.js', // Use 'vue.esm' when importing from 'vue' because 'runtime' build only works for SPA
  };

  const scssResourcesFolder = './src/setup/scss/';
  const scssResources = [
    '_variables.scss',
    '_config.scss',
    '_functions.scss',
    '_mixins.scss',
    '_extends.scss',
  ];

  const plugins = [
    new ESLintPlugin({
      extensions: ['vue', 'js'],
      failOnError: isProduction,
      emitWarning: !isProduction, // Keeps overlay from showing during development, because it's annoying
      cache: !isProduction, // Improves linting performance
    }),
    new webpack.DefinePlugin(globalVariables), // Set node variables.
    new CopyWebpackPlugin([
      {
        from: '**/*',
        context: path.resolve(__dirname, 'static'),
        globOptions: isProduction
          ? { dot: true, ignore: ['**/mockdata/**'] }
          : isStyleguideBuild ? { dot: true } : undefined,
      },
    ]),

    new VueLoaderPlugin(), // *.vue file parser.
    new MiniCssExtractPlugin({ // Extract CSS code
      filename: `${outputAssetsFolder}css/${prefix}[name]${isProduction || isStyleguideBuild ? '.[chunkhash]' : ''}.css`,
    }),
    new HtmlWebpackPlugin({ // Script and style tag injection.
      inject: true,
      template: 'index.html',
      excludeChunks: isStyleguideBuild
        ? Object.keys(themes).slice(1)
        : Object.keys(themes),
    }),
    new StyleLintPlugin({
      emitErrors: isProduction,
      emitWarning: !isProduction,
      lintDirtyModulesOnly: !isProduction,
      context: 'src',
      files: [
        '**/*.vue',
        '**/*.scss',
      ],
    }),
  ];

  if (showProfile) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  if (isProduction || isStyleguideBuild) {
    plugins.push(
      new CleanWebpackPlugin({ // Cleans the dist folder before and after the build.
        cleanAfterEveryBuildPatterns: Object.keys(themes).map(theme => `./**/*${theme}.js`)
      }),
      new WebpackAssetsManifest({ // Creates a manifest.json for the build
        publicPath: true,
      })
    );
  }

  if (!isProduction || hasWatcher) {
    plugins.push(new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: !isStyleguideBuild
          ? [`Your application is running on http://${host === '0.0.0.0' ? 'localhost' : host}:${devPort}.`]
          : null,
      },
    }));
  }

  const svgoPlugins = [
    // { cleanupAttrs: false, },
    // { removeDoctype: false, },
    // { removeXMLProcInst: false, },
    // { removeComments: false, },
    // { removeMetadata: false, },
    // { removeTitle: false, },
    // { removeDesc: false, },
    { removeUselessDefs: false },
    // { removeEditorsNSData: false, },
    // { removeEmptyAttrs: false, },
    // { removeHiddenElems: false, },
    // { removeEmptyText: false, },
    // { removeEmptyContainers: false, },
    { removeViewBox: false, },
    // { cleanUpEnableBackground: true, },
    // { convertStyleToAttrs: true, },
    // { convertColors: true, },
    // { convertPathData: true, },
    // { convertTransform: true, },
    // { removeUnknownsAndDefaults: true, },
    // { removeNonInheritableGroupAttrs: true, },
    // { removeUselessStrokeAndFill: true, },
    // { removeUnusedNS: true, },
    { cleanupIDs: false },
    // { cleanupNumericValues: false, },
    // { moveElemsAttrsToGroup: true, },
    // { moveGroupAttrsToElems: true, },
    // { collapseGroups: false, },
    // { removeRasterImages: false, },
    // { mergePaths: true, },
    // { convertShapeToPath: true, },
    // { sortAttrs: true, },
    // { transformsWithOnePath: false, },
    // { removeDimensions: true, }
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
    before(app, server) {
      if (!isStyleguideBuild) {
        console.clear();
        console.log('\x1b[34m%s\x1b[0m', 'Starting development server...');
      }

      // Refresh browser on non js/vue file changes
      chokidar.watch([
        './src/**/*.scss'
      ]).on('all', function() {
        server.sockWrite(server.sockets, 'content-changed');
      });

      app.use('/__open-in-editor', openInEditor()); // Adds 'open in editor' support for Vue Inspector
    },
  };

  const rules = [
    {
      test: /\.js$/,
      exclude: /core-js/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        hotReload,
        compilerOptions: { // @see https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler#options
          whitespace: 'condense',
          directives: {
            // Remove the Pimcore directive from production.
            'pimcore': () => !isProduction,
            'pimcore-areabrick': () => !isProduction,
            'pimcore-snippet': () => !isProduction,
            'pimcore-template': () => !isProduction,
          }
        }
      },
    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '/', // This was required to prevent invalid asset urls in development
            esModule: false, // Should be removed in the future but was required as of 2021-04-23.
          },
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 2,
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
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            esModule: false,
            context: 'src/assets/',
            name: '[path][name].[hash].[ext]',
            outputPath: `${outputAssetsFolder}img/`,
            publicPath: `${publicPath}${outputAssetsFolder}img/`
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
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            esModule: false,
            context: 'src/assets/fonts',
            name: `[path][name].[hash].[ext]`,
            outputPath: `${outputAssetsFolder}fonts/`,
            publicPath: `${publicPath}${outputAssetsFolder}fonts/`
          },
        }
      ]
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
      new TerserPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: chunk => !['polyfills.ie11', 'polyfills'].includes(chunk.name), // Excludes node modules which are required by IE11 polyfills
        },
      }
    },
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
      'polyfills': path.resolve(__dirname, 'src/setup/polyfills.js'), // If code still fails, you may need to add regenerator as well. See https://babeljs.io/docs/en/babel-polyfill
      'polyfills.ie11': path.resolve(__dirname, 'src/setup/polyfills.ie11.js'),
      'app': [
        path.resolve(__dirname, 'src/main.js'),
      ],
    },
    resolve: {
      extensions,
      alias,
    },
    module: {
      rules,
    },
    stats: !isProduction || hasWatcher ? { all: false } : stats,
    performance: { // Warn about performance issues
      hints: !isProduction || hasWatcher ? false : 'warning',
      maxEntrypointSize: 500000, // 500kb
      maxAssetSize: 150000, // 150kb
    },
    output: {
      path: path.resolve(__dirname, outputPath),
      filename: isProduction || isStyleguideBuild ? `${outputAssetsFolder}js/${prefix}[name].[chunkhash].js` : '[name].js',
      chunkFilename: `${outputAssetsFolder}js/${prefix}[name].[chunkhash].js`,
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
