<template>
  <div>
    <div class="form-group mb-4 d-flex flex-wrap justify-content-between" :key="service" v-for="service in services">
      <div class="mb-1" style="min-width:200px">{{service.name}}</div>
      <div>
        <select class="me-2" v-model="service.channel" :id="'service-channel-'+service.service_id">
          <option value="null">{{$t('locationService_1')}}</option>
          <option v-if="channels.email" value="Email">{{$t('locationService_2')}}</option>
          <option v-if="channels.tg" value="Telegram">{{$t('locationService_3')}}</option>
        </select>
        <select style="" v-model="service.frequency" :id="'service-frequency-'+service.service_id">
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
import '@/types/Service'
import '@/types/Channels'
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
