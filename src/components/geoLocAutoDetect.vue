<template id="geoLocAutoDetect-component">

</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
 name: "geoLocAutoDetect",
    mounted() {
      this.$getLocation(options)
          .then(coordinates => {
            alert(coordinates);
          });
    }
  }
)
</script>

<style scoped>

</style>