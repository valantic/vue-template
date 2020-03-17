### c-table - Default

```vue
<template>
  <div>
    <c-table :items="mockData.dummyTableData"
             :headers="headers">
      <template slot-scope="slotProps">
        
        <!-- Dynamic content cells -->
        <td v-for="headerItem in slotProps.headers" :key="headerItem.value">
        
         <!-- Checkbox example -->
         <e-checkbox
           v-if="headerItem.type === 'checkbox'"
           :checked="slotProps.props.item[headerItem.value]"
           :value="slotProps.props.item.id"
           name="example"
           disabled
         ><span class="invisible">label text</span></e-checkbox>
        
         <!-- Price cell -->
         <span v-price.currencyBefore="slotProps.props.item[headerItem.value] && slotProps.props.item[headerItem.value].grandTotal"
               v-else-if="headerItem.type === 'price'"></span>
        
         <!-- Date cell -->
         <span v-else-if="headerItem.type === 'date'">
           {{ new Date(slotProps.props.item[headerItem.value]).toLocaleDateString() }}
         </span>
        
         <!-- Text cell -->
         <template v-else>
           {{ slotProps.props.item[headerItem.value] }}
         </template>
        </td>
      </template>
    </c-table>
  </div>
</template>

<script>
  export default {
    lastName: 'table1',
    data() {
      return {
        headers: [
          { text: 'ID', value: 'id', type: 'text' },
          { text: 'Vorname', value: 'firstName', type: 'text' },
          { text: 'Nachname', value: 'lastName', type: 'text' },
          { text: 'Stadt', value: 'city', type: 'text' },
          { text: 'Geburtsdatum', value: 'birthDate', type: 'date' },
          { text: 'Firma', value: 'company', type: 'text' },
          { text: 'Infos komplett', value: 'isComplete', type: 'checkbox' },
          { text: 'Kinder', value: 'children', type: 'text' },
        ],
        
      };
    },
  };
</script>

```

### c-table - Search

```vue
<template>
  <div>
    <input type="text" v-model="searchTerm" placeholder="search..." />
    <c-table :items="mockData.dummyTableData"
             :headers="headers"
             :search-term="searchTerm">
      <template slot-scope="slotProps">
        
        <!-- Dynamic content cells -->
        <td v-for="headerItem in slotProps.headers" :key="headerItem.value">
        
        <!-- Checkbox example -->
        <e-checkbox
          v-if="headerItem.type === 'checkbox'"
          :checked="slotProps.props.item[headerItem.value]"
          :value="slotProps.props.item.id"
          name="example"
          disabled
        ><span class="invisible">label text</span></e-checkbox>
        
        <!-- Price cell -->
        <span v-price.currencyBefore="slotProps.props.item[headerItem.value] && slotProps.props.item[headerItem.value].grandTotal"
              v-else-if="headerItem.type === 'price'"></span>
        
        <!-- Date cell -->
        <span v-else-if="headerItem.type === 'date'">
          {{ new Date(slotProps.props.item[headerItem.value]).toLocaleDateString() }}
        </span>
        
        <!-- Text cell -->
        <template v-else>
          {{ slotProps.props.item[headerItem.value] }}
        </template>
        </td>
      </template>
    </c-table>
  </div>
</template>

<script>
  export default {
    lastName: 'table2',
    data() {
      return {
        searchTerm: '',
        headers: [
          { text: 'ID', value: 'id', type: 'text' },
          { text: 'Vorname', value: 'firstName', type: 'text' },
          { text: 'Nachname', value: 'lastName', type: 'text' },
          { text: 'Stadt', value: 'city', type: 'text' },
          { text: 'Geburtsdatum', value: 'birthDate', type: 'date' },
          { text: 'Firma', value: 'company', type: 'text' },
          { text: 'Infos komplett', value: 'isComplete', type: 'checkbox' },
          { text: 'Kinder', value: 'children', type: 'text' },
        ],
        
      };
    },
  };
</script>

```

### c-table - Selectable rows

```vue
<template>
  <div>
    <c-table :items="mockData.dummyTableData"
             :headers="headers"
             is-selectable
             @onChangeSelected="onChangeSelected">
      <template slot-scope="slotProps">
       
       <!-- Dynamic content cells -->
       <td v-for="headerItem in slotProps.headers" :key="headerItem.value">
       
       <!-- Checkbox example -->
       <e-checkbox
         v-if="headerItem.type === 'checkbox'"
         :checked="slotProps.props.item[headerItem.value]"
         :value="slotProps.props.item.id"
         name="example"
         disabled
       ><span class="invisible">label text</span></e-checkbox>
       
       <!-- Price cell -->
       <span v-price.currencyBefore="slotProps.props.item[headerItem.value] && slotProps.props.item[headerItem.value].grandTotal"
             v-else-if="headerItem.type === 'price'"></span>
       
       <!-- Date cell -->
       <span v-else-if="headerItem.type === 'date'">
         {{ new Date(slotProps.props.item[headerItem.value]).toLocaleDateString() }}
       </span>
       
       <!-- Text cell -->
       <template v-else>
         {{ slotProps.props.item[headerItem.value] }}
       </template>
       </td>
      </template>
    </c-table>
   <p>selected:</p>
   {{ selected }}
  </div>
</template>

<script>
  export default {
    lastName: 'table3',
    data() {
      return {
        selected: [],
        headers: [
          { text: 'ID', value: 'id', type: 'text' },
          { text: 'Vorname', value: 'firstName', type: 'text' },
          { text: 'Nachname', value: 'lastName', type: 'text' },
          { text: 'Stadt', value: 'city', type: 'text' },
          { text: 'Geburtsdatum', value: 'birthDate', type: 'date' },
          { text: 'Firma', value: 'company', type: 'text' },
          { text: 'Infos komplett', value: 'isComplete', type: 'checkbox' },
          { text: 'Kinder', value: 'children', type: 'text' },
        ],
        
      };
    },
    methods: {
      onChangeSelected(list) {
        this.selected = list;
      }
    },
  };
</script>

```

### c-table - Pagination

```vue
<template>
  <div>
    <c-table :items="mockData.dummyTableData"
             :headers="headers"
             has-pagination>
      <template slot-scope="slotProps">
        
        <!-- Dynamic content cells -->
        <td v-for="headerItem in slotProps.headers" :key="headerItem.value">
        
        <!-- Checkbox example -->
        <e-checkbox
          v-if="headerItem.type === 'checkbox'"
          :checked="slotProps.props.item[headerItem.value]"
          :value="slotProps.props.item.id"
          name="example"
          disabled
        ><span class="invisible">label text</span></e-checkbox>
        
        <!-- Price cell -->
        <span v-price.currencyBefore="slotProps.props.item[headerItem.value] && slotProps.props.item[headerItem.value].grandTotal"
              v-else-if="headerItem.type === 'price'"></span>
        
        <!-- Date cell -->
        <span v-else-if="headerItem.type === 'date'">
          {{ new Date(slotProps.props.item[headerItem.value]).toLocaleDateString() }}
        </span>
        
        <!-- Text cell -->
        <template v-else>
          {{ slotProps.props.item[headerItem.value] }}
        </template>
        </td>
      </template>
    </c-table>
  </div>
</template>

<script>
  export default {
    lastName: 'table4',
    data() {
      return {
        headers: [
          { text: 'ID', value: 'id', type: 'text' },
          { text: 'Vorname', value: 'firstName', type: 'text' },
          { text: 'Nachname', value: 'lastName', type: 'text' },
          { text: 'Stadt', value: 'city', type: 'text' },
          { text: 'Geburtsdatum', value: 'birthDate', type: 'date' },
          { text: 'Firma', value: 'company', type: 'text' },
          { text: 'Infos komplett', value: 'isComplete', type: 'checkbox' },
          { text: 'Kinder', value: 'children', type: 'text' },
        ],
        
      };
    },
  };
</script>

```

### c-table - Detail-links

```vue
<template>
  <div>
    <c-table :items="mockData.dummyTableData"
             :headers="headers"
             has-link>
      <template slot-scope="slotProps">
        
        <!-- Dynamic content cells -->
        <td v-for="headerItem in slotProps.headers" :key="headerItem.value">
          
          <!-- Checkbox example -->
          <e-checkbox
            v-if="headerItem.type === 'checkbox'"
            :checked="slotProps.props.item[headerItem.value]"
            :value="slotProps.props.item.id"
            name="example"
            disabled
          ><span class="invisible">label text</span></e-checkbox>
          
          <!-- Price cell -->
          <span v-price.currencyBefore="slotProps.props.item[headerItem.value] && slotProps.props.item[headerItem.value].grandTotal"
                v-else-if="headerItem.type === 'price'"></span>
          
          <!-- Date cell -->
          <span v-else-if="headerItem.type === 'date'">
            {{ new Date(slotProps.props.item[headerItem.value]).toLocaleDateString() }}
          </span>
          
          <!-- Text cell -->
          <template v-else>
            {{ slotProps.props.item[headerItem.value] }}
          </template>
        </td>
        
        <td>
          <a class="c-table__link"
             href="#detail">
            <e-icon icon="i-arrow--right--info"
                    width="15"
                    height="15"/>
          </a>
        </td>
      </template> 
    </c-table>
  </div>
</template>

<script>
  export default {
    lastName: 'table5',
    data() {
      return {
        headers: [
          { text: 'ID', value: 'id', type: 'text' },
          { text: 'Vorname', value: 'firstName', type: 'text' },
          { text: 'Nachname', value: 'lastName', type: 'text' },
          { text: 'Stadt', value: 'city', type: 'text' },
          { text: 'Geburtsdatum', value: 'birthDate', type: 'date' },
          { text: 'Firma', value: 'company', type: 'text' },
          { text: 'Infos komplett', value: 'isComplete', type: 'checkbox' },
          { text: 'Kinder', value: 'children', type: 'text' },
        ],
        
      };
    },
  };
</script>

```
