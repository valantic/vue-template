/* eslint-disable no-console */

// Basics
const path = require('path'); // Cross platform path resolver
const webpack = require('webpack');

// Development & build
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Script tag injector
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const pkg = require('./package.json');
const TerserPlugin = require('terser-webpack-plugin');

/**
 * A note about [contenthash]: Using the hash in query could cause troubles with caching proxies. Therefore
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
  const isStyleguide = !!args.styleguide;
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
    '__VUE_PROD_DEVTOOLS__': false,
    '__VUE_I18N_FULL_INSTALL__': true,
    '__VUE_I18N_LEGACY_API__': true,
    '__INTLIFY_PROD_DEVTOOLS__': false,
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
  } = pkg.webpack;

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

  const plugins = [
    new webpack.ProgressPlugin({ percentBy: 'entries', /*profile: true*/ }),

    // Webpack plugin that runs typescript type checker and eslint on a separate process.
    new ForkTsCheckerWebpackPlugin({
      // don't block webpack's emit to wait for type checker in development mode, errors only visible inside CLI
      async: !isProduction,
      formatter: {
        type: 'codeframe',
        options: {
          linesAbove: 2,
          linesBelow: 0.
        }
      },
      logger: {
        infrastructure: 'silent',
        issues: 'console',
        devServer: false,
      },
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
        files: './src/**/*.{ts,js,vue}' // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
      },
    }),

    new webpack.DefinePlugin(globalVariables), // Set node variables.

    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          context: path.resolve(__dirname, 'static'),
          noErrorOnMissing: true,
          globOptions: isProduction
            ? { dot: true, ignore: ['**/mockdata/**'] }
            : isStyleguideBuild ? { dot: true } : undefined,
        },
      ]
    }),

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

  const svgoPlugins = [
    //{ name: 'cleanupAttrs', active: false, },
    //{ name: 'removeDoctype', active: false, },
    //{ name: 'removeXMLProcInst', active: false, },
    //{ name: 'removeComments', active: false, },
    //{ name: 'removeMetadata', active: false, },
    //{ name: 'removeTitle', active: false, },
    //{ name: 'removeDesc', active: false, },
    { name: 'removeUselessDefs', active: false },
    //{ name: 'removeEditorsNSData', active: false, },
    //{ name: 'removeEmptyAttrs', active: false, },
    //{ name: 'removeHiddenElems', active: false, },
    //{ name: 'removeEmptyText', active: false, },
    //{ name: 'removeEmptyContainers', active: false, },
    { name: 'removeViewBox', active: false },
    //{ name: 'cleanUpEnableBackground', active: true, },
    //{ name: 'convertStyleToAttrs', active: true, },
    //{ name: 'convertColors', active: true, },
    //{ name: 'convertPathData', active: true, },
    //{ name: 'convertTransform', active: true, },
    //{ name: 'removeUnknownsAndDefaults', active: true, },
    //{ name: 'removeNonInheritableGroupAttrs', active: true, },
    //{ name: 'removeUselessStrokeAndFill', active: true, },
    //{ name: 'removeUnusedNS', active: true, },
    { name: 'cleanupIDs', active: false },
    //{ name: 'cleanupNumericValues', active: false, },
    //{ name: 'moveElemsAttrsToGroup', active: true, },
    //{ name: 'moveGroupAttrsToElems', active: true, },
    //{ name: 'collapseGroups', active: false, },
    //{ name: 'removeRasterImages', active: false, },
    //{ name: 'mergePaths', active: true, },
    //{ name: 'convertShapeToPath', active: true, },
    //{ name: 'sortAttrs', active: true, },
    //{ name: 'transformsWithOnePath', active: false, },
    //{ name: 'removeDimensions', active: true, }
  ];

  const devServer = {
    historyApiFallback: true, // Enables routing support
    host,
    port: devPort,
    hot: hotReload,
    compress: true,
  };

  // different options needed tue to https://github.com/vue-styleguidist/vue-styleguidist/issues/1074
  if (isStyleguide || isStyleguideBuild) {
    // styleguideist does not need any watcher, because it already contains one out of the box
    devServer['clientLogLevel'] = 'error'; // Removes ESLint warnings from browser console
    devServer['progress'] = true;
    devServer['overlay'] = true;
  } else {
    // this block can be used as default when above issue has been fixed
    devServer['client'] = {
      logging: 'error', // Removes ESLint warnings from console
      progress: true,
      overlay: {
        warnings: false,
        errors: true,
      },
    }
  }

  const assetModulesFileName = function (pathData, assetType) {
    const hash = isProduction || isStyleguideBuild ? '.[contenthash]' : '';
    let subDirPath = '';

    // pathData.module.context contains the absolute path to the module
    if (pathData.module.context.includes('src/assets/')) {
      const contextArray = pathData.module.context.split('src/assets/');
      subDirPath = contextArray.length > 1 ? `${contextArray[1]}/` : ''
    }

    return `${outputAssetsFolder}${assetType}${subDirPath}[name]${hash}[ext]`;
  }

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
      test: /\.s?css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: isProduction || isStyleguideBuild ? productionPath : '/',
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
      ],
    },
    {
      test: /\.(gif|png|jpe?g|svg)$/i,
      type: 'asset/resource',
      generator: {
        filename: ((pathData) => assetModulesFileName(pathData, 'img/')),
      },
      use: [
        {
          loader: 'image-webpack-loader',
          options: {
            disable: !isProduction,
            svgo: {
              plugins: svgoPlugins,
            }
          },
        },
      ]
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      type: 'asset/resource',
      generator: {
        filename: ((pathData) => assetModulesFileName(pathData, 'fonts/')),
      },
    },
    {
      test: /\.md$/, // Required by styleguide.
      use: [
        'vue-loader',
        {
          loader: 'vue-markdown-loader/lib/markdown-compiler',
          options: {
            raw: true,
          },
        },
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
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
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
    excludeAssets: /(assets\/(img|fonts|static)|mock)/,
    hash: true, // Show build hash
    performance: true, // Show warnings for big files
    timings: true, // Show timing information
    warnings: true, // Show warnings
    assetsSpace: Number.MAX_SAFE_INTEGER, // Number of assets which should be shown in stats
    entrypoints: true, // Show entrypoints
    chunks: false,
    moduleAssets: false,
    groupAssetsByChunk: false,
    groupAssetsByEmitStatus: false,
    groupAssetsByInfo: false,
    groupModulesByAttributes: false,
  };

  return {
    watch: hasWatcher,
    mode: isProduction ? 'production' : 'development',
    target: 'browserslist',
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
    stats: !isProduction || hasWatcher ? 'errors-warnings' : stats,
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
