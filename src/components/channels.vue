<template>
  <div id="channels-container">
    <h3>{{$t('channels_1')}}</h3>
    <div class="accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header" v-bind:id="'flush-heading-email'">
          <button class="accordion-button collapsed d-flex justify-content-center" type="button" data-bs-toggle="collapse" v-bind:data-bs-target="'#flush-collapse-email'" aria-expanded="false" v-bind:aria-controls="'#flush-collapse-email'">
            <div class="col-3"><h4>Email:</h4></div>
            <div class="col-8"><h5>{{channels.email??$t('channels_2')}}</h5></div>
          </button>
        </h2>
        <div v-bind:id="'flush-collapse-email'" class="accordion-collapse collapse" v-bind:aria-labelledby="'flush-heading-email'" v-bind:data-bs-parent="'#accordionFlushExample'">
          <div class="accordion-body">
            <div v-if="channels.email">
              <button v-on:click="DELETE_EMAIL_CHANNEL" role="button" class="btn btn-outline-danger btn-sm" :class="{'disabled':!channels.tg}">{{channels.tg?'Disconnect':$t('channels_3')}}</button>
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
            <div class="col-3"><h4>Telegram:</h4></div>
            <div class="col-8"><h5>{{channels.tg??$t('channels_2')}}</h5></div>
          </button>
        </h2>
        <div v-bind:id="'flush-collapse-tg'" class="accordion-collapse collapse" v-bind:aria-labelledby="'flush-heading-tg'" v-bind:data-bs-parent="'#accordionFlushExample'">
          <div class="accordion-body">
            <div v-if="channels.tg">
              <button v-on:click="DELETE_TG_CHANNEL" role="button" class="btn btn-outline-danger btn-sm" :class="{'disabled':!channels.email}">{{channels.email?'Disconnect':$t('channels_3')}}</button>
            </div>
            <div v-else class="d-flex justify-content-center">
              <tgChannel :dataSize="'large'"></tgChannel>
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
    "channels_3":"You can't disconnect the only one channel"
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
</style>