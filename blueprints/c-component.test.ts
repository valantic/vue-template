import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import component from '@/components/c-component'; // TODO: Update source

describe('component | c-component', () => { // TODO: update title
  it('has name property', () => {
    expect(component.name).toBeTruthy();
  });

  it('renders (has bem block name on wrapper element)', () => {
    const wrapper = mount(component, {
      global: {
        plugins: [], // remove if not needed
        props: {}, // remove if not needed
      },
    });

    expect(wrapper.classes()).toContain(component.name);
  });
});
