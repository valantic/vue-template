#### Sortable, custom slot templates, column alignment, disabled column

```vue
<template>
    <e-table
      :items="items"
      :columns="columns"
    >
      <template v-slot:lastChange="data">
        {{ data.item.lastChange.format('DD.MM.YYYY') }}
      </template>

      <template v-slot:rowAction="data">
        <button @click="onCustomActionClick(data.item)">
          A custom action
        </button>
      </template>
    </e-table>
</template>

<script>
  import dayjs from 'dayjs';
  import { name, commerce } from 'faker/locale/en';

  export default {
      data() {
        return {
          columns: [
            {
              title: 'Entry',
              key: 'entry',
              sortable: true,
              slotName: 'entry'
            },
            {
              title: 'Created by',
              key: 'createdBy',
              onClick(item, column) {
                alert(`You clicked on "${item.createdBy}" in the column "${column.title}".`);
              }
            },
            {
              title: 'Last change',
              key: 'lastChange',
              sortable: true,
              sort: (a, b) => (dayjs(a.lastChange).isBefore(dayjs(b.lastChange)) ? -1 : 1),
              slotName: 'lastChange',
              align: 'right',
            },
            {
              title: 'Action',
              slotName: 'rowAction',
              align: 'right',
            }         
          ]
        };
      },
      computed: {
        items() {
          return Array(4).fill(null).map((item, index) => {
            const createdBy = name.findName();
            const entry = commerce.productName();

            return {
              entry,
              lastChange: dayjs().subtract(index, 'day'),
              createdBy,
              searchString: `${createdBy}`,
              disabled: index === 3
            }      
          });
        },
      },
      methods: {
        onCustomActionClick(row) {
          alert(row.entry);
        }     
      }
    }
</script>
```

#### No items

Note: the 'no results' row can be customized with the 'noResults' slot.

```vue
<template>
    <e-table
      :items="items"
      :columns="columns"
    >
      <template v-slot:lastChange="data">
        {{ data.item.lastChange.format('DD.MM.YYYY') }}
      </template>

      <template v-slot:rowAction="data">
        <button @click="onCustomActionClick(data.item)">
          A custom action
        </button>
      </template>
    </e-table>
</template>

<script>
  import dayjs from 'dayjs';

  export default {
      data() {
        return {
          columns: [
            {
              title: 'Entry',
              key: 'entry',
              sortable: true,
              slotName: 'entry'
            },
            {
              title: 'Created by',
              key: 'createdBy',
              onClick(item, column) {
                alert(`You clicked on "${item.createdBy}" in the column "${column.title}".`);
              }
            },
            {
              title: 'Last change',
              key: 'lastChange',
              sortable: true,
              sort: (a, b) => (dayjs(a.lastChange).isBefore(dayjs(b.lastChange)) ? -1 : 1),
              slotName: 'lastChange',
              align: 'right',
            },
            {
              title: 'Action',
              slotName: 'rowAction',
              align: 'right',
            }         
          ]
        };
      },
      computed: {
        items() {
          return [];
        },
      },
      methods: {
        onCustomActionClick(row) {
          alert(row.entry);
        }     
      }
    }
</script>
```

#### Custom header

```vue
<template>
    <e-table
      :items="items"
      :columns="columns"
    >
      <template v-slot:header="data">
        <tr>
          <th :colspan="data.columns.length" style="background-color: coral;">A custom header</th>
        </tr>
      </template>
    </e-table>
</template>

<script>
  import dayjs from 'dayjs';
  import { name, commerce } from 'faker/locale/en';

  export default {
      data() {
        return {
          columns: [
            {
              title: 'Entry',
              key: 'entry',
              sortable: true,
              slotName: 'entry'
            },
            {
              title: 'Created by',
              key: 'createdBy',
              onClick(item, column) {
                alert(`You clicked on "${item.createdBy}" in the column "${column.title}".`);
              }
            },
            {
              title: 'Last change',
              key: 'lastChange',
              sortable: true,
              sort: (a, b) => (dayjs(a.lastChange).isBefore(dayjs(b.lastChange)) ? -1 : 1),
              slotName: 'lastChange',
              align: 'right',
            }  
          ]
        };
      },
      computed: {
        items() {
          return Array(4).fill(null).map((item, index) => {
              const createdBy = name.findName();
              const entry = commerce.productName();
    
              return {
                entry,
                lastChange: dayjs().subtract(index, 'day'),
                createdBy,
                searchString: `${createdBy}`,
                disabled: index === 3
              }      
            });
        },
      },
      methods: {
        onCustomActionClick(row) {
          alert(row.entry);
        }     
      }
    }
</script>
```

#### Row links

```vue
<template>
  <div :class="b()">
    <h1>Sandbox</h1>
    <div>
      <e-table :columns="columns" :items="items" :row-link="{ href: rowHref, title: 'The link title' }" />
    </div>
  </div>
</template>

<script>
  import { commerce, name } from 'faker';
  import dayjs from 'dayjs';
  import ETable from '@/components/e-table';

  export default {
    name: 'sandbox',
    components: { ETable },

    data() {
      return {
        rowHref(item) {
          return `#${item.id}`;
        },
        columns: [
          {
            title: 'Entry',
            key: 'entry',
            sortable: true,
            slotName: 'entry',
          },
          {
            title: 'Created by',
            key: 'createdBy',
            onClick(item, column) {
              alert(`You clicked on "${item.createdBy}" in the column "${column.title}".`);
            }
          },
          {
            title: 'Last change',
            key: 'lastChange',
            sortable: true,
            sort: (a, b) => (dayjs(a.lastChange).isBefore(dayjs(b.lastChange)) ? -1 : 1),
            slotName: 'lastChange',
            align: 'right',
          },
          {
            title: 'Action',
            slotName: 'rowAction',
            align: 'right',
          }
        ]
      };
    },

    computed: {
      items() {
        return Array(4).fill(null).map((item, index) => {
          const createdBy = name.findName();
          const entry = commerce.productName();

          return {
            id: index,
            entry,
            lastChange: dayjs().subtract(index, 'day'),
            createdBy,
            searchString: `${createdBy}`,
            disabled: index === 3
          };
        });
      },
    },
  };
</script>
```
