/**
 * Root component setup for styleguidist.
 *
 * @param   {Object}    previewComponent    The to be displayed component
 *
 * @returns {Object}
 */
// @ts-ignore
export default previewComponent => ({
  // @ts-ignore
  render(createElement) {
    return createElement(previewComponent);
  }
});
