<template>
  <span :class="b()">
    <e-input
      v-model.lazy.trim="dateString"
      :class="b('input')"
      :maxlength="format.length"
      :name="name"
      :state="isInvalid ? FieldState.Error : FieldState.Default"
      :aria-label="label"
      @keypress.enter.prevent="onEnter"
      @focus="onFocus"
      @blur="onBlur"
    >
      <slot></slot>
    </e-input>
  </span>
</template>

<script lang="ts">
  import { Dayjs } from 'dayjs';
  import { defineComponent } from 'vue';
  import { FieldState } from '@/compositions/form-states';
  import eInput from '@/elements/e-input.vue';
  import { DateFormat } from '@/plugins/dayjs';

  type Setup = {
    FieldState: typeof FieldState;
  };

  type Data = {
    dayjsDate: Dayjs;
    textValue: string;
    isInvalid: boolean;
  };

  /**
   * Renders a date input field.
   */
  export default defineComponent({
    name: 'e-date',
    components: {
      eInput,
    },

    props: {
      /**
       * The `name` value for the field.
       */
      name: {
        type: String,
        required: true,
      },

      /**
       * Value passed by v-model
       */
      modelValue: {
        default: () => new Date(),
        type: Date,
      },

      /**
       * Allows to set the accepted input format.
       */
      format: {
        type: String,
        default: () => DateFormat.DD_MM_YYYY,
      },

      /**
       * Allows passing a label for the input element.
       */
      label: {
        type: String,
        default: undefined,
      },
    },
    emits: {
      'update:modelValue': (payload: Date) => !!payload,
      'focus': (payload?: Event) => !!payload,
      'blur': (payload?: Event) => !!payload,
    },

    setup(): Setup {
      return {
        FieldState,
      };
    },
    data(): Data {
      return {
        dayjsDate: this.$dayjs(this.modelValue),
        textValue: '',
        isInvalid: false,
      };
    },

    computed: {
      dateString: {
        set(value: string): void {
          const date = this.$dayjs(value, this.format);

          this.isInvalid = !date.isValid();

          if (this.isInvalid) {
            this.textValue = value;
          } else {
            this.dayjsDate = date;
          }
        },

        get(): string {
          return this.isInvalid ? this.textValue : this.dayjsDate.format(this.format);
        },
      },
    },
    watch: {
      modelValue(date: Date): void {
        this.dayjsDate = this.$dayjs(date);
        this.isInvalid = !this.dayjsDate.isValid();
      },
    },

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeUnmount() {},
    // unmounted() {},

    methods: {
      onEnter(): void {
        this.update();
      },

      onFocus(event: Event): void {
        this.$emit('focus', event);
      },

      onBlur(event: Event): void {
        this.$emit('blur', event);
        this.update();
      },

      update(): void {
        const { dayjsDate } = this;
        const isUnchanged = this.$dayjs(this.modelValue).format() === dayjsDate.format();

        if (!dayjsDate.isValid() || isUnchanged) {
          return;
        }

        this.$emit('update:modelValue', this.dayjsDate.toDate());
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  // @use '@/setup/scss/mixins';
  // @use '@/setup/scss/variables';

  .e-date {
    position: relative;
    display: block;
  }
</style>
