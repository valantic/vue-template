import Vue from 'vue';
import component from '@/components/e-icon';

describe('component | e-button', () => {
  it('has name property', () => {
    expect(component.name).toBeTruthy();
  });

  it('renders (has bem block name on wrapper element)', () => {
    const Constructor = Vue.extend(component);
    const vm = new Constructor({
      propsData: {
        icon: 'styleguide-heart'
      }
    });

    vm.$mount();

    expect(vm.$el.classList.contains(component.name)).toBeTruthy();
  });
});
