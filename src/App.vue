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
    ...mapActions('guest', [
      'GET_CURRENT_LOCATION'
    ]),
    ...mapActions('profile',[
      'FETCH_AVATAR'
    ]),
    ...mapMutations('user',[
      'login',
      'logout'
    ])
  },
  async created() {
    //this.$i18n.locale = this.$translate()
    if(sessionStorage.getItem('sessionKey')){
      await this.FETCH_AVATAR()
      .then(()=>{
        this.login(sessionStorage.getItem('sessionKey'))
      })
      .catch(()=>{
        this.logout()
      })
    }
    this.FETCH_CONFIG().then(()=>{
      this.init = true
    })
    
  },
  mounted() {
    this.GET_CURRENT_LOCATION()
  }
})
</script>

