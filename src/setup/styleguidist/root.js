/**
 * Root component setup for styleguidist.
 *
 * @param   {Object}    previewComponent    The to be displayed component
 *
 * @returns {Object}
 */
export default previewComponent => ({
  render(createElement) {
    return createElement(previewComponent);
  }
});
