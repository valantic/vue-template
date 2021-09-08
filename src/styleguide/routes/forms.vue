<template>
  <div :class="b()">
    <h1>
      Example form
    </h1>
    <form action="#form-url" method="POST">
      <!-- e-input -->
      <div :class="b('part')">
        <e-label name="Firstname" position="top">
          <e-input v-model="demo.firstName" name="firstName" placeholder="Firstname..." />
        </e-label>
      </div>

      <!-- e-textarea -->
      <div :class="b('part')">
        <e-label name="Message" position="top">
          <e-textarea v-model="demo.message" name="message" placeholder="Message..." />
        </e-label>
      </div>

      <!-- e-checkbox -->
      <div :class="b('part')">
        <e-label name="Meal" position="top">
          <e-checkbox v-model="demo.meal" value="pizza" name="meal">
            Pizza
          </e-checkbox>
          <e-checkbox v-model="demo.meal" value="spaghetti" name="meal">
            Spaghetti
          </e-checkbox>
          <e-checkbox v-model="demo.meal" value="lasagne" name="meal">
            Lasagne
          </e-checkbox>
        </e-label>
      </div>

      <!-- e-radio -->
      <div :class="b('part')">
        <e-label name="Drink" position="top">
          <e-radio v-model="demo.drink" value="cola" name="drink">
            Cola
          </e-radio>
          <e-radio v-model="demo.drink" value="fanta" name="drink">
            Fanta
          </e-radio>
          <e-radio v-model="demo.drink" value="sprite" name="drink">
            Sprite
          </e-radio>
        </e-label>
      </div>

      <!-- e-select -->
      <div :class="b('part')">
        <e-label name="Language" position="top">
          <e-select v-model="demo.language" :options="mock.selects" name="language" />
        </e-label>
      </div>

      <div :class="b('part')">
        <c-multiselect :active-value="demo.meal"
                       :items="mock.mealValues"
                       title="Multiselect"
                       placeholder="Lorem ipsum"
                       facet-name="foo"
                       @update="onMultiselectUpdate"
        />
      </div>

      <!-- e-button -->
      <div :class="b('part')">
        <e-button type="submit">
          Submit
        </e-button>
      </div>
    </form>
    <hr style="margin-top: 50px;">
    <h3>Data:</h3>
    <small>
      <pre>{{ demo }}</pre>
    </small>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import eLabel from '@/components/e-label.vue';
  import cMultiselect from '@/components/c-multiselect.vue';

  interface ISelectItem {
    label: string;
    value: string;
  }

  interface IMealItem {
    value: string;
    id: string;
  }

  interface IData {
    demo: {
      firstName: string;
      message: string;
      meal: (string | number)[];
      drink: string;
      language: string;
    },
    mock: {
      selects: ISelectItem[];
      mealValues: IMealItem[];
    }
  }

  export default defineComponent({
    name: 'forms',
    components: {
      cMultiselect,
      eLabel
    },
    data(): IData {
      return {
        demo: {
          firstName: '',
          message: '',
          meal: [],
          drink: '',
          language: '',
        },
        mock: {
          selects: [
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
            }
          ],
          mealValues: [
            'pizza',
            'spaghetti',
            'lasagne',
          ].map(item => ({
            id: item,
            value: item
          }))
        }
      };
    },
    methods: {
      onMultiselectUpdate(component: InstanceType<typeof cMultiselect>) {
        this.demo.meal = Object.values(component.checkedItems);
      }
    }
  });
</script>

<style lang="scss">
  .forms {
    padding: $spacing--50;
    max-width: 400px;

    &__part {
      margin-bottom: $spacing--15;
    }
  }
</style>
