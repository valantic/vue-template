import dayjs from 'dayjs';
import { VueBemFunction } from '@/plugins/vue-bem-cn/src/globals';
import { Viewport } from '@/plugins/viewport';
import { Gtm } from '@/plugins/google-tag-manager';

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
