import { defineConfig, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { webpack } from './package.json'; // TODO: rename config property in package.json.

/**
 * Notes:
 * - Style only components are imported by src/setup/components.ts.
 */

export default defineConfig(({ command, mode }) => {
  const config: UserConfigExport = {
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src/'),
        'vue': 'vue/dist/vue.esm-bundler.js', // Was required because inline import of vue.esm-bundler.js resulted in TS issues.
      },
    },
    define: {
      // Was required to get rid of esm build warning for Vue-i18n.
      // @see https://vue-i18n.intlify.dev/guide/advanced/optimization.html#reduce-bundle-size-with-feature-build-flags
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
    },
    json: {
      stringify: true,
    },
  };

  switch (command) {
    case 'build': // @see https://vitejs.dev/config/build-options.html
      config.base = webpack.productionPath; // TODO: rename to buildBase.
      config.build = {
        outDir: `${webpack.buildPath}`, // TODO: rename to 'buildOutDir'
        assetsInlineLimit: 0, // TODO: check if it makes sense to increase this value.
        manifest: true,
        emptyOutDir: true,
        copyPublicDir: true,

        // TODO: watch?
        rollupOptions: {
          input: {
            'app/index': './src/main.ts',
            'pimcore/index': './src/pimcore/index.ts',
          },
          output: {
            entryFileNames: '[name].[hash].js',
            chunkFileNames: `${webpack.outputAssetsFolder}/[name].[hash].js`,
            assetFileNames(assetInfo) {
              const fileName = assetInfo?.name || '';
              const imageExtensions = /\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i;
              const styleExtensions = /\.(css|sass|scss)$/i;
              const fontExtensions = /\.(woff|woff2|eot|ttf|otf)$/i;
              const scriptExtensions = /\.(vue|js|ts)$/i;
              let name = '[name]';
              let assetsPath = webpack.outputAssetsFolder;

              if (imageExtensions.test(fileName)) {
                assetsPath += '/img';
              } else if (styleExtensions.test(fileName)) {
                assetsPath += '/css';
              } else if (fontExtensions.test(fileName)) {
                assetsPath += '/fonts';
              } else if (scriptExtensions.test(fileName)) {
                assetsPath = '';
              }

              switch (fileName) {
                case 'main.css':
                  name = webpack.appName;

                // no default
              }

              return `${assetsPath}/${name}.[hash].[ext]`;
            },
            manualChunks(source) { // eslint-disable-line consistent-return -- giving no return value is legit.
              // Additional tests can be added to create additional splits.
              if (source.includes('node_modules')) {
                return 'vendor';
              }
            },
          },
        },
      };

      if (mode === 'profile') {
        if (!Array.isArray(config.plugins)) {
          config.plugins = [];
        }

        config.plugins.push(
          visualizer({ // NOTE: the sizes reported by this plugin relate to the source, not build size... @see https://github.com/btd/rollup-plugin-visualizer/issues/96
            filename: './stats/index.html',
            open: true,
            template: 'treemap',
          })
        );
      }
  }

  return config;
});
