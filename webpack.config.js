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
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
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
    // @see https://github.com/vuejs/vue-next/tree/master/packages/vue#bundler-build-feature-flags
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
  const extensions = ['.js', '.vue', '.json', '.ts'];
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
    // Webpack plugin that runs typescript type checker and eslint on a separate process.
    new ForkTsCheckerWebpackPlugin({
      // don't block webpack's emit to wait for type checker in development mode, errors only visible inside CLI
      async: !isProduction,
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        extensions: {
          vue: {
            enabled: true,
            compiler: '@vue/compiler-sfc'
          }
        },
        // Set the tsconfig.json path
        configFile: './tsconfig.json',
      },
      eslint: {
        files: './src/**/*.{ts,js}' // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
      },
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
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        hotReload,
        compilerOptions: { // @see https://vue-loader.vuejs.org/options.html
          whitespace: 'condense',
        }
      },
    },
    {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      options: {
        // disable type checking - it is done via ForkTsCheckerWebpackPlugin to increase speed
        transpileOnly: true,
        appendTsSuffixTo: [/\.vue$/],
      }
    },
    {
      test: /\.js$/,
      exclude: /core-js/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
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
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
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
      'app': [
        path.resolve(__dirname, 'src/main.ts'),
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
