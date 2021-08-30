import { Plugin } from 'vue';
import { DirectiveBinding } from '@vue/runtime-core';

/**
 * Append Pimcore editable attributes for the Pimcore generator.
 */
function editable(el: HTMLElement, binding: DirectiveBinding) {
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
 */
function areabrick(el: HTMLElement, binding: DirectiveBinding) {
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
 */
function snippet(el: HTMLElement, binding: DirectiveBinding) {
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
 */
function template(el: HTMLElement, binding: DirectiveBinding) {
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
const plugin: Plugin = {
  install(app) {
    /**
     * Directive to apply Pimcore generator attributes for an editable.
     *
     * v-pimcore="[<editable>, <identifier>[, <restriction>]]"
     */
    app.directive('pimcore', {
      beforeMount: editable,
      updated: editable,
    });

    /**
     * Directive to apply Pimcore generator attributes for an editable.
     *
     * v-pimcore-areabrick="'<name>'"
     */
    app.directive('pimcore-areabrick', {
      beforeMount: areabrick,
      updated: areabrick,
    });

    /**
     * Directive to apply Pimcore generator attributes for an editable.
     *
     * v-pimcore-snippet[.disable]="'<name>'"
     */
    app.directive('pimcore-snippet', {
      beforeMount: snippet,
      updated: snippet,
    });

    /**
     * Directive to apply Pimcore generator attributes for a page template.
     *
     * v-pimcore-template[.disable]
     */
    app.directive('pimcore-template', {
      beforeMount: template,
      updated: template,
    });
  }
};

export default plugin;
