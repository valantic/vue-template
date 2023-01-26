/**
 * @jest-environment jsdom
 */

import { createApp } from 'vue';
import { mount } from '@vue/test-utils';
import price from '@/directives/price';

const testCases = {
  '10.00': 'v-price="1000"',
  'CHF 10.00': 'v-price.currencyBefore="1000"',
  '10.00 CHF': 'v-price.currencyAfter="1000"',
  '': 'v-price',
};

describe('directive | v-price', () => {
  const app = createApp({});

  app.directive(price.name, price.directive);

  it('has name property', () => {
    expect(price.name).toBeTruthy();
  });

  Object.entries(testCases).forEach((entry) => {
    const [output, input] = entry;

    it('renders formatted price', () => {
      const App = {
        template: `<div><span ${input}></span></div>`,
      };

      const global = {
        directives: {
          Price: price,
        },
      };

      const wrapper = mount(App, { global });

      expect(wrapper.text()).toEqual(output);
    });
  });
});
