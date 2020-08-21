/**
 * Adds pimcore generator attribute to the given element.
 *
 * @param {Node} el - The element to which the directive is bound.
 * @param {Object} binding - Binding related data.
 */
function bind(el, binding) {
  let restriction;
  let editable;
  let identifier;

  switch (binding.arg) {
    case 'snippet':
      el.dataset.pimcoreIsSnippet = 'true';
      break;

    case 'areabrick':
      if (!binding.value) {
        throw new Error('No name was defined for the areabrick.');
      }

      el.dataset.pimcoreAreabrick = binding.value;
      break;

    case 'disable':
      el.dataset.pimcoreDisableEditmode = 'true'; // TODO should be renamed to `pimcore-disable-in-edit-mode`
      break;

    default:
      if (Array.isArray(binding.value)) {
        [
          editable,
          identifier,
          restriction
        ] = binding.value;
      }

      if (!editable) {
        throw new Error('No editable type given for Pimcore editable.');
      }

      if (!identifier) {
        throw new Error('No identifier given for Pimcore editable.');
      }

      // @see https://pimcore.com/docs/6.x/Development_Documentation/Documents/Editables/index.html#page_List-of-Editables
      el.dataset.pimcoreType = editable;
      el.dataset.pimcoreIdentifier = identifier;

      if (restriction) {
        // @see https://pimcore.com/docs/6.x/Development_Documentation/Documents/Editables/Relation_(Many-To-One).html#page_Using-Restriction
        el.dataset.pimcoreArg = JSON.stringify(restriction);
      }
      break;
  }
}

/**
 * Directive to apply pimcore generator attributes.
 *
 * v-pimcore:editable="[<editable>, <identifier>[, <restriction>]]"
 * v-pimcore:areabrick="'<name>'"
 * v-pimcore:snippet
 * v-pimcore:disable
 */
export default {
  name: 'pimcore',

  bind,

  update: bind,
};
