import Vue from 'vue';
import price from '@/directives/price';

describe('directive | v-price', () => {
  it('has name property', () => {
    expect(price.name).toBeTruthy();
  });

  xit('renders (has bem block name on wrapper element)', () => {
    // TODO: Make this test work. Currently we get undefined in vm.$el.innerHTML.

    const template = `<div>
        <span v-price.currencyBefore="1000"></span>
    </div>`;

    Vue.directive(price);

    const vm = new Vue({
      template,
    }).$mount();

    Vue.nextTick(() => {
      expect(vm.$el.innerHTML).toEqual(expect.stringContaining('CHF 10.00'));
    });
  });
});
