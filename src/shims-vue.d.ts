declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>; // eslint-disable-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any

  export default component;
}
