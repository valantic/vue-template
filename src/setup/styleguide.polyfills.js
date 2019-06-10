/* eslint-disable prefer-rest-params, no-plusplus */
/**
 * Node.replaceWith() polyfill.
 *
 * @param {Element} Ele - The new element.
 *
 * @constructor
 */
function ReplaceWith(Ele) { // eslint-disable-line no-inner-declarations
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
      parent.insertBefore(this.previousSibling, arguments[i]);
    }
  }

  if (firstIsNode) {
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
