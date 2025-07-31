/* eslint-disable capitalized-comments, no-case-declarations */
// Vitest instead of Vite was used because of extended Interface.
import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { visualizer } from 'rollup-plugin-visualizer';
import type { PluginOption } from 'vite';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { Mode, plugin as mdPlugin } from 'vite-plugin-markdown';
import { UserConfigExport } from 'vitest/config';
import viteBuilds from './vite.builds.json';

interface Modes {
  [key: string]: {
    input: string[];
  };
}

interface ViteBuilds {
  base: string;
  outDir: string;
  assetsDir: string;
  profileBuild: string;
  modes: Modes;
  themeSource: string;
  themeFiles: string[];
}

export const alias = {
  '@': path.resolve(fileURLToPath(new URL('src/', import.meta.url))),
  '@!production': path.resolve(fileURLToPath(new URL('src/', import.meta.url))), // Workaround so that no assets from conditional styleguide related imports become part of the build.
  'vue': 'vue/dist/vue.esm-bundler.js', // Was required because inline import of vue.esm-bundler.js resulted in TS issues.
};

/**
 * Notes:
 * - Style only components are imported by src/setup/components.ts.
 */
export default defineConfig(({ command, mode }) => {
  const config: UserConfigExport = {
    plugins: [
      vue(),
      // eslint-disable-next-line new-cap
      ViteImageOptimizer({
        // logStats: false,
      }),
      mdPlugin({
        mode: [Mode.VUE],
      }),
      compression(),
    ],
    resolve: {
      alias,
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
    test: {
      environment: 'jsdom',
    },
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // or "modern"
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
  };

  switch (command) {
    case 'build': // @see https://vitejs.dev/config/build-options.html
      const isProfileBuild = mode === 'profile';
      const { base, outDir, assetsDir, modes, profileBuild } = (viteBuilds as ViteBuilds) || {};

      if (!isProfileBuild && !modes[mode]) {
        throw new Error(`Given mode '${mode}' is unknown.`);
      }

      const { input } = modes[isProfileBuild ? profileBuild : mode] || {};

      config.base = base;
      config.build = {
        target: 'esnext', // Use modern JS features for a smaller bundle
        minify: 'esbuild', // Faster and efficient minification
        outDir: `${outDir}/${mode}`,
        assetsInlineLimit: 0, // TODO: check if it makes sense to increase this value.
        manifest: 'manifest.json', // Add a name to avoid .vite folders in the output dir.
        emptyOutDir: true,
        sourcemap: true,
        copyPublicDir: true,
        // Disable css code split by default.
        // This will build all css into one style.css file.
        cssCodeSplit: false,

        // TODO: watch?
        rollupOptions: {
          external: [
            /!dev/, // Removes styleguide/dev only assets.
          ],
          input,
          output: {
            entryFileNames: 'index.[hash].js',
            chunkFileNames(chunkInfo): string {
              const jsPath = `${assetsDir}/js`;

              if (!chunkInfo.facadeModuleId) {
                return `${jsPath}/shared.${chunkInfo.moduleIds.length}-[hash].js`;
              }

              return `${jsPath}/[name].[hash].js`;
            },
            assetFileNames(assetInfo): string {
              const fileName = assetInfo?.name || '';
              const imageExtensions = /\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i;
              const styleExtensions = /\.(css|sass|scss)$/i;
              const fontExtensions = /\.(woff|woff2|eot|ttf|otf)$/i;
              const scriptExtensions = /\.(vue|js|ts)$/i;
              let assetsPath = assetsDir;

              if (imageExtensions.test(fileName)) {
                assetsPath += '/img';
              } else if (styleExtensions.test(fileName)) {
                assetsPath += '/css';
              } else if (fontExtensions.test(fileName)) {
                assetsPath += '/fonts';
              } else if (scriptExtensions.test(fileName)) {
                assetsPath = '';
              }

              return `${assetsPath}/[name].[hash].[ext]`;
            },
            manualChunks: {
              'chunk.vue': ['vue', 'pinia', 'axios'],
              'chunk.datepicker': ['pikaday'],
              'chunk.validation': ['@vuelidate/core', '@vuelidate/validators'], // Group validation libraries
              'chunk.i18n': ['vue-i18n/dist/vue-i18n.cjs'],
              'chunk.utils': [
                'dayjs',
                'dayjs/plugin/advancedFormat',
                'dayjs/plugin/isSameOrBefore',
                'dayjs/plugin/timezone',
                'dayjs/plugin/utc',
              ], // One chunk for utilities
              'chunk.carousel': ['embla-carousel', 'embla-carousel-autoplay'], // Keep carousel together
              'chunk.popups': ['floating-vue', 'body-scroll-lock'], // Group popup-related libraries
            },
          },
        },
      };

      if (mode === 'profile') {
        if (!Array.isArray(config.plugins)) {
          config.plugins = [];
        }

        config.plugins.push(
          visualizer({
            // NOTE: the sizes reported by this plugin relate to the source, not build size... @see https://github.com/btd/rollup-plugin-visualizer/issues/96
            filename: './stats/index.html',
            open: true,
            template: 'treemap',
          }) as PluginOption,
        );
      }

    // no default
  }

  return config;
});
