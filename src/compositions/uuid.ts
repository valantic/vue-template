let globalUuid = 0;

export interface Uuid {
  uuid: number;
}

/**
 * Logic can be used to add a unique id for every instance of a component.
 *
 * @mixin
 */
export default (): Uuid => {
  globalUuid += 1;

  return {
    uuid: globalUuid,
  };
};
