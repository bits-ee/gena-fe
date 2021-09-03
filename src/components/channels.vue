<template>
  <div id="channels-container">
    <h3>{{$t('channels_1')}}</h3>
    <div class="accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header" v-bind:id="'flush-heading-email'">
          <button class="accordion-button collapsed d-flex" type="button" data-bs-toggle="collapse" v-bind:data-bs-target="'#flush-collapse-email'" aria-expanded="false" v-bind:aria-controls="'#flush-collapse-email'">
            <div class="me-2 channel-label"><h4>Email:</h4></div>
            <div class="col-9 channel-value"><h5 class="m-0">{{channels.email??$t('channels_2')}}</h5></div>
          </button>
        </h2>
        <div v-bind:id="'flush-collapse-email'" class="accordion-collapse collapse" v-bind:aria-labelledby="'flush-heading-email'" v-bind:data-bs-parent="'#accordionFlushExample'">
          <div class="accordion-body">
            <div v-if="channels.email" class="mx-auto" style="max-width: fit-content;">
              <button v-on:click="DELETE_EMAIL_CHANNEL" role="button" class="btn btn-outline-danger" :class="{'disabled':!channels.tg}">{{channels.tg?$t('channels_4'):$t('channels_3')}}</button>
            </div>
            <div v-else>
              <emailLogin :is_channel="true"></emailLogin>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" v-bind:id="'flush-heading-tg'">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" v-bind:data-bs-target="'#flush-collapse-tg'" aria-expanded="false" v-bind:aria-controls="'#flush-collapse-tg'">
            <div class="me-2 channel-label"><h4>Telegram:</h4></div>
            <div class="col-9 channel-value"><h5 class="m-0">{{channels.tg??$t('channels_2')}}</h5></div>
          </button>
        </h2>
        <div v-bind:id="'flush-collapse-tg'" class="accordion-collapse collapse" v-bind:aria-labelledby="'flush-heading-tg'" v-bind:data-bs-parent="'#accordionFlushExample'">
          <div class="accordion-body">
            <div v-if="channels.tg" class="mx-auto" style="max-width: fit-content;">
              <button v-on:click="DELETE_TG_CHANNEL" role="button" class="btn btn-outline-danger" :class="{'disabled':!channels.email}">{{channels.email?$t('channels_4'):$t('channels_3')}}</button>
            </div>
            <div v-else class="d-flex justify-content-center">
              <tgChannel></tgChannel>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
{
  "en":{
    "channels_1":"My Notification Channels",
    "channels_2":"Not connected",
    "channels_3":"You can't disconnect the only one channel",
    "channels_4":"Disconnect"
  },
  "de":{
    "channels_1":"My Notification Channels",
    "channels_2":"Not connected",
    "channels_3":"You can't disconnect the only one channel"
  }
}
</i18n>

<script lang="ts">
import { defineComponent } from 'vue'
import tgChannel from './tgChannel.vue'
import emailLogin from './emailLogin.vue'
import { mapGetters, mapActions } from 'vuex';


export default defineComponent({
  components: {
    'tgChannel': tgChannel,
    'emailLogin': emailLogin
  },
  computed:{
    ...mapGetters('profile', [
      'channels'
    ])
  },
  methods: {
    ...mapActions('profile', [
      'DELETE_EMAIL_CHANNEL',
      'DELETE_TG_CHANNEL',
      'VERIFY_EMAIL_CHANNEL',
      'VERIFY_TG_CHANNEL',
    ])
  }
})
</script>
<style scoped>
  h4{
    padding: 0;
    margin: 0;
  }
  .channel-label{
    min-width:110px;
  }
  .channel-value{
    overflow:hidden;
    flex-shrink: 1;
  }
</style>