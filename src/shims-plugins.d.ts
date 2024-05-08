import dayjs from 'dayjs';
import { Gtm } from '@/plugins/google-tag-manager';
import { Viewport } from '@/plugins/viewport';
import { VueBemFunction } from '@/plugins/vue-bem-cn/src/globals';

declare module '@vue/runtime-core' {
  // provide typings for global properties
  interface ComponentCustomProperties {
    $dayjs: typeof dayjs;
    $viewport: Viewport;
    $gtm: Gtm;
    gtmIdentifier: string;
    b: VueBemFunction;

    // needed for tests
    bem: VueBemFunction;
  }
}

export {};
