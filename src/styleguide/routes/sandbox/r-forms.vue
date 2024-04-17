<template>
  <div :class="b()">
    <!-- Rendered form -->
    <section :class="b('form')">
      <h1>Newsletter Registration</h1>
      <form
        ref="formRef"
        action="#form-url"
        method="POST"
        @submit.prevent="onSubmit"
      >
        <!-- Section 1 -->
        <e-fieldset legend="Contact information">
          <e-label name="Name">
            <e-input
              v-model="form.name"
              name="name"
              placeholder="Your Name"
            />
          </e-label>
          <e-label name="Surname">
            <e-input
              v-model="form.surname"
              name="surname"
              placeholder="Your Surname"
              disabled
            />
          </e-label>
          <e-label
            name="E-Mail"
            required
          >
            <e-input
              v-model="form.email"
              :state="v$.form.email.$error ? FieldState.Error : FieldState.Default"
              :notification="v$.form.email.$error ? '<b>No valid email address</b>' : ''"
              type="email"
              name="email"
              placeholder="Your E-Mail"
              @blur="v$.form.email.$touch()"
            />
          </e-label>
          <e-label
            name="Language"
            required
          >
            <e-select
              v-model="form.language"
              :options="mock.languages"
              :state="v$.form.language.$error ? FieldState.Error : FieldState.Default"
              :notification="v$.form.language.$error ? 'Required field' : ''"
              name="language"
              @blur="v$.form.language.$touch()"
            />
          </e-label>
          <e-label
            name="Color"
            required
          >
            <e-select
              v-model="form.color"
              :options="mock.colors"
              :state="v$.form.color.$error ? FieldState.Error : FieldState.Default"
              :notification="v$.form.color.$error ? 'Required field' : ''"
              name="color"
              disabled
              @blur="v$.form.color.$touch()"
            />
          </e-label>
          <e-label
            tag="span"
            name="Business fields"
            required
          >
            <e-multiselect
              v-model="form.businessFields"
              :options="mock.businessFields"
              :state="v$.form.businessFields.$error ? FieldState.Error : FieldState.Default"
              :notification="v$.form.businessFields.$error ? 'Required field' : ''"
              has-search
              @blur="v$.form.businessFields.$touch()"
            />
          </e-label>
          <e-label name="Notes">
            <e-textarea
              v-model="form.notes"
              name="notes"
              placeholder="Your Notes"
            />
          </e-label>
        </e-fieldset>

        <!-- Section 2 -->
        <e-fieldset legend="Personal interests">
          <e-label
            name="Topics"
            tag="div"
          >
            <e-checkbox
              v-model="form.topics"
              value="food"
              name="topics"
              disabled
            >
              Food
            </e-checkbox>
            <e-checkbox
              v-model="form.topics"
              value="technics"
              name="topics"
              disabled
            >
              Technics
            </e-checkbox>
            <e-checkbox
              v-model="form.topics"
              value="celebrities"
              name="topics"
            >
              Celebrities
            </e-checkbox>
            <e-checkbox
              v-model="form.topics"
              value="garden"
              name="topics"
              variant="toggle"
            >
              Garden
            </e-checkbox>
            <e-checkbox
              v-model="form.topics"
              value="architecture"
              name="topics"
              variant="toggle"
            >
              Architecture
            </e-checkbox>
          </e-label>

          <e-label
            name="Frequency of Mailing"
            tag="div"
          >
            <e-radio
              v-model="form.frequency"
              value="onceAWeek"
              name="frequency"
            >
              Once a week
            </e-radio>
            <e-radio
              v-model="form.frequency"
              value="twiceAWeek"
              name="frequency"
            >
              Twice a week
            </e-radio>
            <e-radio
              v-model="form.frequency"
              value="onceAMonth"
              name="frequency"
            >
              Once a month
            </e-radio>
            <e-radio
              v-model="form.frequency"
              value="twiceAMonth"
              name="frequency"
              disabled
            >
              Twice a month
            </e-radio>
          </e-label>
        </e-fieldset>

        <e-fieldset legend="Date Pickers">
          <e-label
            name="Date Input"
            tag="div"
            inner-tag="div"
          >
            <e-date
              v-model="form.date"
              name="date"
              label="date"
            />
          </e-label>
          <e-label
            name="Date Picker"
            tag="div"
            inner-tag="div"
          >
            <c-date-picker
              v-model:start="form.startDate"
              name="start"
            />
          </e-label>
          <e-label
            name="Date Range Picker"
            tag="div"
            inner-tag="div"
          >
            <c-date-picker
              v-model:start="form.startDate"
              v-model:end="form.endDate"
              name="date-picker"
              range
            />
          </e-label>
        </e-fieldset>

        <e-button
          type="submit"
          primary
        >
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
  import useVuelidate, { Validation } from '@vuelidate/core';
  import { email, required } from '@vuelidate/validators';
  import { Ref, defineComponent, ref } from 'vue';
  import cDatePicker from '@/components/c-date-picker.vue';
  import { FieldState } from '@/compositions/form-states';
  import eButton from '@/elements/e-button.vue';
  import eCheckbox from '@/elements/e-checkbox.vue';
  import eDate from '@/elements/e-date.vue';
  import eFieldset from '@/elements/e-fieldset.vue';
  import eInput from '@/elements/e-input.vue';
  import eLabel from '@/elements/e-label.vue';
  import eMultiselect from '@/elements/e-multiselect.vue';
  import eRadio from '@/elements/e-radio.vue';
  import eSelect from '@/elements/e-select.vue';
  import eTextarea from '@/elements/e-textarea.vue';

  type SelectItem = {
    label: string;
    value: string;
  };

  type Setup = {
    v$: Ref<Validation>;
    formRef: Ref<HTMLFormElement | null>;
    FieldState: typeof FieldState;
  };

  type Data = {
    form: {
      name: string;
      surname: string;
      email: string;
      notes: string;
      language: string;
      color: string;
      topics: string[];
      frequency: string;
      businessFields: string[];
      date: Date;
      startDate: Date;
      endDate: Date;
    };
    mock: {
      businessFields: SelectItem[];
      languages: SelectItem[];
      colors: SelectItem[];
    };
  };

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
      cDatePicker,
      eDate,
    },

    setup(): Setup {
      const formRef = ref();

      return {
        // eslint-disable-next-line id-length
        v$: useVuelidate(),
        formRef,
        FieldState,
      };
    },

    data(): Data {
      return {
        form: {
          name: '',
          surname: '',
          email: '',
          notes: '',
          language: '',
          color: 'red',
          topics: ['technics'],
          frequency: 'twiceAMonth',
          businessFields: [],
          date: new Date(),
          startDate: new Date(),
          endDate: new Date(),
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
          colors: [
            {
              label: 'Red',
              value: 'red',
            },
            {
              label: 'Green',
              value: 'green',
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
        color: {
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
  @use '../../../setup/scss/variables';

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

    .e-label:not(:last-child) {
      margin-bottom: variables.$spacing--20;
    }

    .e-checkbox + .e-checkbox,
    .e-radio + .e-radio {
      margin-top: variables.$spacing--5;
    }
  }
</style>
