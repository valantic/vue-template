import { mount, createLocalVue } from '@vue/test-utils';
import VueBemCn from '@/setup/plugins/vue-bem-cn';
import component from '@/components/c-component'; // TODO: Update source

describe('component | c-component', () => { // TODO: update title
  const localVue = createLocalVue();

  localVue.use(VueBemCn);

  it('has name property', () => {
    expect(component.name).toBeTruthy();
  });

  it('renders (has bem block name on wrapper element)', () => {
    const wrapper = mount(component, { localVue });

    expect(wrapper.classes()).toContain(component.name);
  });
});
