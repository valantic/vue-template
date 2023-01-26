import { DefineComponent } from 'vue';

interface IStorybookActions {
  [key: string]: {
    action: string,
  }
}

/**
 * Maps the events of the given component to an action definition for Storybooks 'argTypes'.
 */
export default function mapComponentEventsToStorybookActions(component: DefineComponent): IStorybookActions | null {
  if (!component.emits || Array.isArray(component.emits)) {
    return null;
  }

  return Object.keys(component.emits).reduce((accumulator: IStorybookActions, event) => {
    accumulator[`on${event.charAt(0).toUpperCase() + event.slice(1)}`] = {
      action: event,
    };

    return accumulator;
  }, {});
}
