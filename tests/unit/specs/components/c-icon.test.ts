/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import VueBemCn from '@/plugins/vue-bem-cn';
import component from '@/components/e-icon.vue';

describe('component | e-button', () => {
  it('has name property', () => {
    expect(component.name).toBeTruthy();
  });

  it('renders (has bem block name on wrapper element)', () => {
    const wrapper = mount(component, {
      global: {
        plugins: [VueBemCn]
      },
      props: {
        icon: 'styleguide-heart'
      }
    });

    expect(wrapper.classes()).toContain(component.name);
  });
});
