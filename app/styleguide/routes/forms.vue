<template>
  <div v-bem>
    <e-heading tag-name="h1">
      Example form
    </e-heading>
    <form action="#form-url" method="POST">
      <!-- e-input -->
      <div v-bem:part>
        <e-label name="Firstname" position="top">
          <e-input v-model="demo.firstName" name="firstName" placeholder="Firstname..." />
        </e-label>
      </div>

      <!-- e-textarea -->
      <div v-bem:part>
        <e-label name="Message" position="top">
          <e-textarea v-model="demo.message" name="message" placeholder="Message..." />
        </e-label>
      </div>

      <!-- e-checkbox -->
      <div v-bem:part>
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
      <div v-bem:part>
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
      <div v-bem:part>
        <e-label name="Language" position="top">
          <e-select v-model="demo.language" :options-list="mock.selects" name="language" />
        </e-label>
      </div>

      <!-- e-button -->
      <div v-bem:part>
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
<script>
  export default {
    name: 'forms',
    // components: {},
    data() {
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
        }
      };
    },
  };
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
