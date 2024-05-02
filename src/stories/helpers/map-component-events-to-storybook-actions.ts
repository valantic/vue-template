import { DefineComponent } from 'vue';

type StorybookActions = {
  [key: string]: {
    action: string;
  };
}

/**
 * Maps the events of the given component to an action definition for Storybooks 'argTypes'.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function mapComponentEventsToStorybookActions(component: DefineComponent | any): StorybookActions | null {
  if (!component.emits || Array.isArray(component.emits)) {
    return null;
  }

  return Object.keys(component.emits).reduce((accumulator: StorybookActions, event) => {
    accumulator[`on${event.charAt(0).toUpperCase() + event.slice(1)}`] = {
      action: event,
    };

    return accumulator;
  }, {});
}
