let globalUuid = 0;

export type Uuid = {
  uuid: number;
};

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
