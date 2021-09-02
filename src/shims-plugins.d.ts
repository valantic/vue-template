import { Dayjs } from 'dayjs';
import { AxiosStatic } from 'axios';
import { IVueBemFunction } from '@/plugins/vue-bem-cn/src/globals';
import { IViewport } from '@/plugins/viewport';
import { IGtm } from '@/plugins/google-tag-manager';
import { IApi } from '@/helpers/api';

declare module '@vue/runtime-core' {
  // provide typings for global properties
  interface ComponentCustomProperties {
    $api: IApi;
    $axios: AxiosStatic;
    $dayjs: Dayjs;
    $viewport: IViewport;
    $gtm: IGtm;
    gtmIdentifier: string;
    b: IVueBemFunction;
  }
}
