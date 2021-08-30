/**
 * Root component setup for styleguidist.
 */
// @ts-ignore
export default previewComponent => ({
  // @ts-ignore
  render(createElement) {
    return createElement(previewComponent);
  }
});
