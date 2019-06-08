let uuid = 0;

/**
 * Mixin can be used to add a unique id for every instance of a component.
 *
 * @mixin
 */
export default {
  beforeCreate() {
    this.uuidInt = uuid;
    this.uuid = uuid.toString();
    uuid += 1;
  },
};
