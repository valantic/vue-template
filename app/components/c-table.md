### c-table - Default

```vue
<template>
  <div>
    <c-table :items="items"
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
    name: 'table1',
    data() {
      return {
        items: this.$store.getters['shoppingList/getOverview'],
        headers: [
          { text: 'ID', value: 'idShoppingList', type: 'text' },
          { text: 'Kundenreferenz', value: 'customerReference', type: 'text' },
          { text: 'Name', value: 'name', type: 'text' },
          { text: 'Beschreibung', value: 'description', type: 'text' },
          { text: 'Aktualisiert am', value: 'updatedAt', type: 'text' },
          { text: 'Anzahl Inhalte', value: 'numberOfItems', type: 'text' },
          { text: 'Freigabe', value: 'isShared', type: 'checkbox' },
          { text: 'Ersteller', value: 'owner', type: 'text' },
          { text: 'Register ID', value: 'requesterId', type: 'text' },
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
    <input type="text" v-model="searchTerm" placeholder="search...">
    <c-table :items="items"
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
    name: 'table2',
    data() {
      return {
        searchTerm: '',
        items: this.$store.getters['shoppingList/getOverview'],
        headers: [
          { text: 'ID', value: 'idShoppingList', type: 'text' },
          { text: 'Kundenreferenz', value: 'customerReference', type: 'text' },
          { text: 'Name', value: 'name', type: 'text' },
          { text: 'Beschreibung', value: 'description', type: 'text' },
          { text: 'Aktualisiert am', value: 'updatedAt', type: 'text' },
          { text: 'Anzahl Inhalte', value: 'numberOfItems', type: 'text' },
          { text: 'Freigabe', value: 'isShared', type: 'checkbox' },
          { text: 'Ersteller', value: 'owner', type: 'text' },
          { text: 'Register ID', value: 'requesterId', type: 'text' },
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
    <c-table :items="items"
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
    name: 'table3',
    data() {
      return {
        selected: [],
        items: this.$store.getters['shoppingList/getOverview'],
        headers: [
          { text: 'ID', value: 'idShoppingList', type: 'text' },
          { text: 'Kundenreferenz', value: 'customerReference', type: 'text' },
          { text: 'Name', value: 'name', type: 'text' },
          { text: 'Beschreibung', value: 'description', type: 'text' },
          { text: 'Aktualisiert am', value: 'updatedAt', type: 'text' },
          { text: 'Anzahl Inhalte', value: 'numberOfItems', type: 'text' },
          { text: 'Freigabe', value: 'isShared', type: 'checkbox' },
          { text: 'Ersteller', value: 'owner', type: 'text' },
          { text: 'Register ID', value: 'requesterId', type: 'text' },
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
    <c-table :items="items"
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
    name: 'table4',
    data() {
      return {
        items: this.$store.getters['shoppingList/getOverview'],
        headers: [
          { text: 'ID', value: 'idShoppingList', type: 'text' },
          { text: 'Kundenreferenz', value: 'customerReference', type: 'text' },
          { text: 'Name', value: 'name', type: 'text' },
          { text: 'Beschreibung', value: 'description', type: 'text' },
          { text: 'Aktualisiert am', value: 'updatedAt', type: 'text' },
          { text: 'Anzahl Inhalte', value: 'numberOfItems', type: 'text' },
          { text: 'Freigabe', value: 'isShared', type: 'checkbox' },
          { text: 'Ersteller', value: 'owner', type: 'text' },
          { text: 'Register ID', value: 'requesterId', type: 'text' },
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
    <c-table :items="items"
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
          <a :class="b('link')"
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
    name: 'table5',
    data() {
      return {
        items: this.$store.getters['shoppingList/getOverview'],
        headers: [
          { text: 'ID', value: 'idShoppingList', type: 'text' },
          { text: 'Kundenreferenz', value: 'customerReference', type: 'text' },
          { text: 'Name', value: 'name', type: 'text' },
          { text: 'Beschreibung', value: 'description', type: 'text' },
          { text: 'Aktualisiert am', value: 'updatedAt', type: 'text' },
          { text: 'Anzahl Inhalte', value: 'numberOfItems', type: 'text' },
          { text: 'Freigabe', value: 'isShared', type: 'checkbox' },
          { text: 'Ersteller', value: 'owner', type: 'text' },
          { text: 'Register ID', value: 'requesterId', type: 'text' },
        ],
        
      };
    },
  };
</script>

```