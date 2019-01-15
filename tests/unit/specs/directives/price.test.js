import { mount, createLocalVue } from '@vue/test-utils';
import price from '@/directives/price';

const testCases = {
  '10.00': 'v-price="1000"',
  'CHF 10.00': 'v-price.currencyBefore="1000"',
  '10.00 CHF': 'v-price.currencyAfter="1000"',
  '': 'v-price',
};

describe('directive | v-price', () => {
  const localVue = createLocalVue();

  localVue.directive(price.name, price);

  it('has name property', () => {
    expect(price.name).toBeTruthy();
  });

  Object.entries(testCases).forEach((entry) => {
    const [output, input] = entry;

    it('renders formated price', () => {
      const wrapper = mount({
        template: `<div><span ${input}></span></div>`
      }, { localVue });

      expect(wrapper.text()).toEqual(output);
    });
  });
});
