<template>
  <div ref="tgLogin"></div>
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
      this.script = document.createElement('script');
      this.script.setAttribute('src','https://telegram.org/js/telegram-widget.js?14')
      this.script.setAttribute('data-telegram-login', this.tgBotName)
      this.script.setAttribute('data-size','large')
      this.script.setAttribute('data-radius','5')
      this.script.setAttribute('async', true)
      this.script.setAttribute('data-onauth','onTelegramAuth(user)')
      this.script.setAttribute('data-request-access','write')
      this.script.setAttribute('data-userpic','true')
      this.script.setAttribute('data-lang', "en")
      this.$refs.tgLogin.appendChild(this.script)
    }
  },
  mounted(){
    this.tgInit()
  }
})
</script>
