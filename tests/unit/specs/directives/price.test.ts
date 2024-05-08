import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import price from '@/directives/price';

const testCases = {
  '10,00': 'v-price="1000"',
  'CHF 10,00': 'v-price.currencyBefore="1000"',
  '10,00 CHF': 'v-price.currencyAfter="1000"',
  '': 'v-price',
};

describe('directive | v-price', () => {
  const app = createApp({});

  app.directive(price.name, price);

  it('has name property', () => {
    expect(price.name).toBeTruthy();
  });

  Object.entries(testCases).forEach((entry) => {
    const [output, input] = entry;

    it('renders formatted price', () => {
      const Component = {
        template: `<div><span ${input}></span></div>`,
      };

      const global = {
        directives: {
          Price: price,
        },
      };

      // @ts-ignore -- Did not know how to fix the invalid type of 'App'.
      const wrapper = mount(Component, { global });

      expect(wrapper.text()).toEqual(output);
    });
  });
});
