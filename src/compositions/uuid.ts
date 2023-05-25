let globalUuid = 0;

export interface IUuid {
  uuid: number;
}

/**
 * Logic can be used to add a unique id for every instance of a component.
 *
 * @mixin
 */
export default (): IUuid => {
  globalUuid += 1;

  return {
    uuid: globalUuid,
  };
};
