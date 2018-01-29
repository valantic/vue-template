import Vue from 'vue';
import component from '@/components/c-component'; // TODO: Update source

describe('component | c-component', () => { // TODO: update title
  it('has name property', () => {
    expect(component.name).toBeTruthy();
  });

  it('renders (has bem block name on wrapper element)', () => {
    const Constructor = Vue.extend(component);
    const vm = new Constructor().$mount();

    expect(vm.$el.classList.contains(component.name)).toBeTruthy();
  });
});
