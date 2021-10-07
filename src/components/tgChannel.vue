<template>
  <div ref="tgChannel"></div>
</template>
<script>
import { defineComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex';
export default defineComponent({
  data(){
    return{
      script: null
    }
  },
  computed:{
    ...mapGetters('config', [
      'tgBotName'
    ])
  },
  methods: {
    ...mapActions('profile', [
      'VERIFY_TG_CHANNEL',
    ]),
    tgInit(){
      window.onTelegramAuth = this.VERIFY_TG_CHANNEL
      this.script = document.createElement('script');
      this.script.setAttribute('src','https://telegram.org/js/telegram-widget.js?14')
      this.script.setAttribute('data-telegram-login', this.tgBotName)
      this.script.setAttribute('data-size','large')
      this.script.setAttribute('data-radius','5')
      this.script.setAttribute('data-onauth','onTelegramAuth(user)')
      this.script.setAttribute('data-request-access','write')
      this.script.setAttribute('data-userpic','true')
      this.script.setAttribute('data-lang', this.$i18n.locale)
      this.$refs.tgChannel.appendChild(this.script)
    }
  },
  mounted(){
    this.tgInit()
  }
})
</script>
