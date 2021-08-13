import { ComponentPublicInstance, Plugin } from 'vue';

type EventBusFunction = (payload: any) => void;

interface IEventBus {
  $on: (selector: string, callback: EventBusFunction) => void;
  $emit: (selector: string, payload: {
    component: any,
    toggledCollapse?: ComponentPublicInstance,
  }) => void;
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $eventBus: IEventBus
  }
}

/**
 * Adds a reference for the API helper to the Vue instance.
 */
const plugin: Plugin = {
  install(app /* , options */) {
    app.config.globalProperties.$eventBus = {
      $on: () => {
        console.error('event bus needs to be replaced with PubSup');
      },
      $emit: () => {
        console.error('event bus needs to be replaced with PubSup');
      },
    };
  },
};

export default plugin;
