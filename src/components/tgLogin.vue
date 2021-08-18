<template>
  <div ref="tgLogin"></div>
</template>
<script>
import { defineComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex';
export default defineComponent({
  computed:{
    ...mapGetters('config', [
      'tgBotName'
    ])
  },
  methods: {
    ...mapActions('user', [
      'LOGIN_TG',
    ]),
    onTelegramAuth(user) {
      this.LOGIN_TG(user).then(()=>{
        this.$router.push({name: 'profile'})
      })
    },
    tgInit(){
      window.onTelegramAuth = this.onTelegramAuth
      let script = document.createElement('script');
      script.setAttribute('src','https://telegram.org/js/telegram-widget.js?14')
      script.setAttribute('data-telegram-login', this.tgBotName)
      script.setAttribute('data-size','large')
      script.setAttribute('data-radius','5')
      script.setAttribute('async', true)
      script.setAttribute('data-onauth','onTelegramAuth(user)')
      script.setAttribute('data-request-access','write')
      script.setAttribute('data-userpic','true')
      script.setAttribute('data-lang', this.$i18n.locale)
      this.$refs.tgLogin.appendChild(script)
    }
  },
  mounted(){
    this.tgInit()
  }
})
</script>
