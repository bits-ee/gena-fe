<template>
    <div class="input-group">
        <input required class="form-control p-0" style="border:none" ref="tomSelect" :placeholder="$t('tomSelect_1')" @change="returnSelected()"/>
        <button v-if="viewSearchButton" class="btn btn-primary" type="submit"><svg class="" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M19 17l-5.15-5.15a7 7 0 1 0-2 2L17 19zM3.5 8A4.5 4.5 0 1 1 8 12.5 4.5 4.5 0 0 1 3.5 8z"/></svg></button>
    </div>
</template>

<i18n>
{
  "en":{
    "tomSelect_1":"Select a location"
  },
  "de":{
    "tomSelect_1":"Select a location"
  }
}
</i18n>

<script>
import { defineComponent } from 'vue'
import _ from 'lodash'
export default defineComponent({
    data() {
        return {
            ts: null
        }
    },
    props: {
        locations: Array,
        selectedValue: Number,
        viewSearchButton:{
            type: Boolean,
            default: true
        }
    },

    watch:{
        selectedValue: function(newVal, oldVal){
            this.ts.setValue(newVal)
        }
    },
    methods: {
        initTomSelect() {
            this.ts = new TomSelect(this.$refs.tomSelect, {
                openOnFocus: false,
                maxItems: 1,
                maxOptions: 20,
                valueField: 'id',
                searchField: ['display_name'],
                labelField: 'display_name',
                sortField: 'display_name',
                closeAfterSelect: true,
                searchConjunction: 'and',
                options: this.locations,
                render: {
                    'no_results': function(data,escape) {
			            return '<div class="no-results">Unknown location "'+escape(data.input)+'".</div>';
		            }
                }
            });
            this.ts.on('focus', () => {
                this.ts.clear();
                this.ts.open();
            });
            this.ts.setValue(this.selectedValue)
        },

        showDropdownList() {
            this.ts.open();
        },

        returnSelected() {
            if(this.ts.getValue()){
                this.$emit('tsChanged', this.ts.getValue())
            }
        }
    },
    mounted() {
        this.initTomSelect()
    },
})
</script>
<style>
  .ts-input.focus {
    box-shadow: none;
  }

  .ts-input {
    z-index: 0;
    border-color: rgb(118, 118, 118) rgb(133, 133, 133);
    border-radius: 2px;
  }

  .ts-input.items{
    height: 100%;
  }

  .ts-control .items .item {
    box-shadow: none;
  }

  .ts-control.form-control{
    border: none !important;
  }

  .ts-control.single .ts-input:after {
    content: none;
  }
</style>
<style scoped>
  

  
</style>