<template>
  <div :class="b()">
    <!-- Rendered form -->
    <section :class="b('form')">
      <h1>
        Newsletter Registration
      </h1>
      <form ref="formRef"
            action="#form-url"
            method="POST"
            @submit.prevent="onSubmit"
      >
        <!-- Section 1 -->
        <e-fieldset legend="Contact information">
          <e-label name="Name">
            <e-input v-model="form.name"
                     name="name"
                     placeholder="Your Name"
            />
          </e-label>
          <e-label name="E-Mail" required>
            <e-input v-model="form.email"
                     :state="v$.form.email.$error ? FieldStates.Error : FieldStates.Default"
                     :notification="v$.form.email.$error ? '<b>No valid email address</b>' : ''"
                     type="email"
                     name="email"
                     placeholder="Your E-Mail"
                     @blur="v$.form.email.$touch()"
            />
          </e-label>
          <e-label name="Language" required>
            <e-select v-model="form.language"
                      :options="mock.languages"
                      :state="v$.form.language.$error ? FieldStates.Error : FieldStates.Default"
                      :notification="v$.form.language.$error ? 'Required field' : ''"
                      name="language"
                      @blur="v$.form.language.$touch()"
            />
          </e-label>
          <e-label name="Business fields" required>
            <e-multiselect v-model="form.businessFields"
                           :options="mock.businessFields"
                           :state="v$.form.businessFields.$error ? FieldStates.Error : FieldStates.Default"
                           :notification="v$.form.businessFields.$error ? 'Required field' : ''"
                           has-search
                           @blur="v$.form.businessFields.$touch()"
            />
          </e-label>
          <e-label name="Notes">
            <e-textarea v-model="form.notes"
                        name="notes"
                        placeholder="Your Notes"
            />
          </e-label>
        </e-fieldset>

        <!-- Section 2 -->
        <e-fieldset legend="Personal interests">
          <e-label name="Topics" tag="div">
            <e-checkbox v-model="form.topics"
                        value="food"
                        name="topics"
            >
              Food
            </e-checkbox>
            <e-checkbox v-model="form.topics"
                        value="technics"
                        name="topics"
            >
              Technics
            </e-checkbox>
            <e-checkbox v-model="form.topics"
                        value="celebrities"
                        name="topics"
            >
              Celebrities
            </e-checkbox>
            <e-checkbox v-model="form.topics"
                        value="garden"
                        name="topics"
                        variant="toggle"
            >
              Garden
            </e-checkbox>
            <e-checkbox v-model="form.topics"
                        value="architecture"
                        name="topics"
                        variant="toggle"
            >
              Architecture
            </e-checkbox>
          </e-label>

          <e-label name="Frequency of Mailing" tag="div">
            <e-radio v-model="form.frequency"
                     value="onceAWeek"
                     name="frequency"
            >
              Once a week
            </e-radio>
            <e-radio v-model="form.frequency"
                     value="twiceAWeek"
                     name="frequency"
            >
              Twice a week
            </e-radio>
            <e-radio v-model="form.frequency"
                     value="onceAMonth"
                     name="frequency"
            >
              Once a month
            </e-radio>
            <e-radio v-model="form.frequency"
                     value="twiceAMonth"
                     name="frequency"
            >
              Twice a month
            </e-radio>
          </e-label>
        </e-fieldset>

        <e-button type="submit" primary>
          Submit
        </e-button>
      </form>
    </section>

    <!-- Data object -->
    <section :class="b('data')">
      <h1>Data:</h1>
      <small>
        <pre>{{ form }}</pre>
      </small>
    </section>

    <!-- Vuelidate object -->
    <section :class="b('validation')">
      <h1>Validation:</h1>
      <small>
        <pre>{{ v$.form }}</pre>
      </small>
    </section>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, Ref } from 'vue';
  import useVuelidate, { Validation } from '@vuelidate/core';
  import { required, email } from '@vuelidate/validators';
  import eFieldset from '@/elements/e-fieldset.vue';
  import eMultiselect from '@/elements/e-multiselect.vue';
  import eLabel from '@/elements/e-label.vue';
  import eInput from '@/elements/e-input.vue';
  import eSelect from '@/elements/e-select.vue';
  import eRadio from '@/elements/e-radio.vue';
  import eCheckbox from '@/elements/e-checkbox.vue';
  import eTextarea from '@/elements/e-textarea.vue';
  import eButton from '@/elements/e-button.vue';
  import { FieldStates } from '@/compositions/form-states';

  interface ISelectItem {
    label: string;
    value: string;
  }

  interface ISetup {
    v$: Ref<Validation>;
    formRef: Ref<HTMLFormElement | null>;
    FieldStates: typeof FieldStates;
  }

  interface IData {
    form: {
      name: string;
      email: string;
      notes: string;
      language: string;
      topics: string[];
      frequency: string;
      businessFields: string[]
    },
    mock: {
      businessFields: ISelectItem[];
      languages: ISelectItem[];
    }
  }

  export default defineComponent({
    name: 'r-forms',

    components: {
      eFieldset,
      eMultiselect,
      eLabel,
      eInput,
      eSelect,
      eRadio,
      eCheckbox,
      eTextarea,
      eButton,
    },

    setup(): ISetup {
      const formRef = ref();

      return {
        // eslint-disable-next-line id-length
        v$: useVuelidate(),
        formRef,
        FieldStates,
      };
    },

    data(): IData {
      return {
        form: {
          name: '',
          email: '',
          notes: '',
          language: '',
          topics: [],
          frequency: '',
          businessFields: [],
        },
        mock: {
          languages: [
            {
              label: 'German',
              value: 'german',
            },
            {
              label: 'Italian',
              value: 'italian',
            },
            {
              label: 'French',
              value: 'french',
            },
          ],
          businessFields: [
            {
              label: 'Production',
              value: 'production',
            },
            {
              label: 'Sales',
              value: 'sales',
            },
            {
              label: 'HR',
              value: 'hr',
            },
            {
              label: 'Finance',
              value: 'finance',
            },
          ],
        },
      };
    },

    /**
     * Vueldate validation config.
     */
    validations: {
      form: {
        email: {
          required,
          email,
        },
        language: {
          required,
        },
        businessFields: {
          required,
        },
      },
    },

    methods: {
      /**
       * Submit form event handler.
       */
      onSubmit() {
        this.v$.$touch();

        if (this.v$.$pending || this.v$.$error) {
          return;
        }

        if (this.formRef) {
          this.formRef.submit();
        }
      },
    },
  });
</script>

<style lang="scss">
  @use '../../setup/scss/variables';

  .r-forms {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    &__form,
    &__data,
    &__validation {
      padding: variables.$spacing--50;
      border: 1px dotted variables.$color-grayscale--500;
    }

    .e-fieldset {
      margin-bottom: variables.$spacing--50;
    }

    .e-label:not(:last-of-type) {
      margin-bottom: variables.$spacing--20;
    }

    .e-checkbox + .e-checkbox,
    .e-radio + .e-radio {
      margin-top: variables.$spacing--5;
    }
  }
</style>
