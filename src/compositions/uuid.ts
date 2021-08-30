import { ref, Ref } from 'vue';

let globalUuid = 0;

export interface IUuid {
  uuid: Ref<number>;
  increaseUuid: () => void;
}

/**
 * Mixin can be used to add a unique id for every instance of a component.
 *
 * @mixin
 */
export default (): IUuid => {
  const uuid = ref<number>(globalUuid);

  const increaseUuid = () => {
    globalUuid += 1;
  };

  return {
    uuid,
    increaseUuid,
  };
};
