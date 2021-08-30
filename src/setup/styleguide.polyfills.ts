/* eslint-disable prefer-rest-params, no-plusplus */
/**
 * Node.replaceWith() polyfill.
 */
function ReplaceWith(Ele: any) { // eslint-disable-line no-inner-declarations
  // @ts-ignore
  const parent = this.parentNode;
  let i = arguments.length;
  const firstIsNode = +(parent && typeof Ele === 'object');

  if (!parent) {
    return;
  }

  while (i-- > firstIsNode) {
    if (parent && typeof arguments[i] !== 'object') {
      arguments[i] = document.createTextNode(arguments[i]);
    }

    if (!parent && arguments[i].parentNode) {
      arguments[i].parentNode.removeChild(arguments[i]);
    } else {
      // @ts-ignore
      parent.insertBefore(this.previousSibling, arguments[i]);
    }
  }

  if (firstIsNode) {
    // @ts-ignore
    parent.replaceChild(Ele, this);
  }
}

if (!Element.prototype.replaceWith) {
  Element.prototype.replaceWith = ReplaceWith;
}

if (!CharacterData.prototype.replaceWith) {
  CharacterData.prototype.replaceWith = ReplaceWith;
}

if (!DocumentType.prototype.replaceWith) {
  CharacterData.prototype.replaceWith = ReplaceWith;
}
