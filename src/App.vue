<template>
  <router-view v-if="init"/>
</template>
<script>
import { mapActions, mapMutations } from 'vuex';
import { defineComponent } from 'vue'
export default defineComponent({
  data(){
    return{
      init: false
    }
  },
  methods:{
    ...mapActions('config',[
      'FETCH_CONFIG'
    ]),
    ...mapActions('profile',[
      'FETCH_AVATAR'
    ]),
    ...mapMutations('user',[
      'login',
      'logout'
    ])
  },
  created() {
    //this.$i18n.locale = this.$translate()
    this.FETCH_CONFIG().then(()=>{
      this.init = true
    })
    if(sessionStorage.getItem('sessionKey')){
      this.FETCH_AVATAR()
      .then(()=>{
        this.login(sessionStorage.getItem('sessionKey'))
      })
      .catch(()=>{
        this.logout()
      })
    }
  }
})
</script>

