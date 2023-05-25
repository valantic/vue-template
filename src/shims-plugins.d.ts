import dayjs from 'dayjs';
import { IVueBemFunction } from '@/plugins/vue-bem-cn/src/globals';
import { IViewport } from '@/plugins/viewport';
import { IGtm } from '@/plugins/google-tag-manager';

declare module '@vue/runtime-core' {
  // provide typings for global properties
  interface ComponentCustomProperties {
    $dayjs: dayjs;
    $viewport: IViewport;
    $gtm: IGtm;
    gtmIdentifier: string;
    b: IVueBemFunction;

    // needed for tests
    bem: IVueBemFunction;
  }
}

export {};
