/**
 * Append Pimcore editable attributes for the Pimcore generator.
 *
 * @param {Node} el - The element to which the directive is bound.
 * @param {Object} binding - Binding related data.
 */
function editable(el, binding) {
  if (!Array.isArray(binding.value)) {
    throw new Error('The data given to the v-pimcore directive is not of type Array.');
  }

  const [
    type,
    identifier,
    configuration
  ] = binding.value;

  if (typeof type !== 'string') {
    throw new Error('No editable type given for Pimcore editable.');
  }

  if (typeof identifier !== 'string') {
    throw new Error('No identifier given for Pimcore editable.');
  }

  // @see https://pimcore.com/docs/6.x/Development_Documentation/Documents/Editables/index.html#page_List-of-Editables
  el.dataset.pimcoreType = type;
  el.dataset.pimcoreIdentifier = identifier;

  if (configuration) {
    // @see https://pimcore.com/docs/6.x/Development_Documentation/Documents/Editables/Relation_(Many-To-One).html#page_Using-Restriction
    el.dataset.pimcoreArg = JSON.stringify(configuration);
  }

  if (binding.modifiers?.disable) {
    el.dataset.pimcoreDisableInEditmode = 'true';
  }
}

/**
 * Append Pimcore areabrick attributes for the Pimcore generator.
 *
 * @param {Node} el - The element to which the directive is bound.
 * @param {Object} binding - Binding related data.
 */
function areabrick(el, binding) {
  if (!binding.value || typeof binding.value !== 'string') {
    throw new Error('No name was defined for the areabrick or the value is not of type Array.');
  }

  el.dataset.pimcoreAreabrick = binding.value;

  if (binding.modifiers?.disable) {
    el.dataset.pimcoreDisableInEditmode = 'true';
  }
}

/**
 * Append Pimcore snippet attributes for the Pimcore generator.
 *
 * @param {Node} el - The element to which the directive is bound.
 * @param {Object} binding - Binding related data.
 */
function snippet(el, binding) {
  if (!binding.value || typeof binding.value !== 'string') {
    throw new Error('No name was defined for the snippet or the value is not of type Array.');
  }

  el.dataset.pimcoreSnippet = binding.value;

  if (binding.modifiers?.disable) {
    el.dataset.pimcoreDisableInEditmode = 'true';
  }
}

/**
 * Append Pimcore areabrick attributes for the Pimcore generator.
 *
 * @param {Node} el - The element to which the directive is bound.
 * @param {Object} binding - Binding related data.
 */
function template(el, binding) {
  if (!binding.value || typeof binding.value !== 'string') {
    throw new Error('No name was defined for the template or the value is not of type Array.');
  }

  el.dataset.pimcoreTemplate = binding.value;

  if (binding.modifiers?.disable) {
    el.dataset.pimcoreDisableInEditmode = 'true';
  }
}

/**
 * Registers directives to autogenerate Pimcore generator related attributes.
 */
export default {
  install(Vue) {
    /**
     * Directive to apply Pimcore generator attributes for an editable.
     *
     * v-pimcore="[<editable>, <identifier>[, <restriction>]]"
     */
    Vue.directive('pimcore', {
      name: 'pimcore',

      bind: editable,
      update: editable,
    });

    /**
     * Directive to apply Pimcore generator attributes for an editable.
     *
     * v-pimcore-areabrick="'<name>'"
     */
    Vue.directive('pimcore-areabrick', {
      name: 'pimcore-areabrick',

      bind: areabrick,
      update: areabrick,
    });

    /**
     * Directive to apply Pimcore generator attributes for an editable.
     *
     * v-pimcore-snippet[.disable]="'<name>'"
     */
    Vue.directive('pimcore-snippet', {
      name: 'pimcore-snippet',

      bind: snippet,
      update: snippet,
    });

    /**
     * Directive to apply Pimcore generator attributes for a page template.
     *
     * v-pimcore-template[.disable]
     */
    Vue.directive('pimcore-template', {
      name: 'pimcore-template',

      bind: template,
      update: template,
    });
  }
};
