<template>
  <div>
    <div class="form-group row mb-4" :key="service" v-for="service in services">
      <div class="col-5">{{service.name}}</div>
      <div class="col-7 d-flex justify-content-between">
        <select style="width:47%" v-model="service.channel">
          <option value="null">{{$t('locationService_1')}}</option>
          <option v-if="channels.email">{{$t('locationService_2')}}</option>
          <option v-if="channels.tg">{{$t('locationService_3')}}</option>
        </select>
        <select style="width:47%" v-model="service.frequency">
          <option value="null">{{$t('locationService_4')}}</option>
          <option :key="frequency" v-for="frequency in frequencies">{{frequency}}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<i18n>
{
  "en":{
    "locationService_1":"Channel",
    "locationService_2":"Email",
    "locationService_3":"Telegram",
    "locationService_4":"Frequency"
  },
  "de":{
    "locationService_1":"Channel",
    "locationService_2":"Email",
    "locationService_3":"Telegram",
    "locationService_4":"Frequency"
  }
}
</i18n>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  props:{
    services:{
      type: Object as PropType<Service[]>
    },
    channels:{
      type: Object as PropType<Channels>
    }
  },
  data() {
    return {
      frequencies: {'daily_brief': 'Daily brief', 'daily_digest': 'Daily digest', 'weekly_brief': 'Weekly brief', 'weekly_digest': 'Weekly digest'},
    }
  }
})
</script>

<style scoped>
  select{
    height: 30px;
  }
</style>
