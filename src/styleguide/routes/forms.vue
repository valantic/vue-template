<template>
  <div :class="b()">
    <h1>
      Newsletter Registration
    </h1>
    <form action="#form-url" method="POST">
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
                   type="email"
                   name="email"
                   placeholder="Your E-Mail"
          />
        </e-label>
        <e-label name="Language" required>
          <e-select v-model="form.language"
                    :options="mock.languages"
                    name="language"
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
        <e-label name="Topics" tag="div" required>
          <e-checkbox v-model="form.topics"
                      value="food"
                      name="topics">
            Food
          </e-checkbox>
          <e-checkbox v-model="form.topics"
                      value="technics"
                      name="topics">
            Technics
          </e-checkbox>
          <e-checkbox v-model="form.topics"
                      value="celebrities"
                      name="topics">
            Celebrities
          </e-checkbox>
          <e-checkbox v-model="form.topics"
                      value="garden"
                      name="topics">
            Garden
          </e-checkbox>
          <e-checkbox v-model="form.topics"
                      value="architecture"
                      name="topics">
            Architecture
          </e-checkbox>
        </e-label>

        <e-label name="Frequency of Mailing" tag="div" required>
          <e-radio v-model="form.frequency"
                   value="onceAWeek"
                   name="frequency">
            Once a week
          </e-radio>
          <e-radio v-model="form.frequency"
                   value="twiceAWeek"
                   name="frequency">
            Twice a week
          </e-radio>
          <e-radio v-model="form.frequency"
                   value="onceAMonth"
                   name="frequency">
            Once a month
          </e-radio>
          <e-radio v-model="form.frequency"
                   value="twiceAMonth"
                   name="frequency">
            Twice a month
          </e-radio>
        </e-label>
      </e-fieldset>

      <e-button type="submit">
        Submit
      </e-button>
    </form>
    <hr style="margin-top: 50px;">
    <h3>Data:</h3>
    <small>
      <pre>{{ form }}</pre>
    </small>
  </div>
</template>
<script>
  import eFieldset from '@/components/e-fieldset';

  export default {
    name: 'forms',
    components: {
      eFieldset,
    },
    // components: {},
    data() {
      return {
        form: {
          name: '',
          email: '',
          notes: '',
          language: '',
          topics: [],
          frequency: '',
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

    .e-fieldset {
      margin-bottom: $spacing--50;
    }

    .e-label:not(:last-of-type) {
      margin-bottom: $spacing--10;
    }
  }
</style>
