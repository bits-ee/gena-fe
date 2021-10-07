<template>
  <div class="notification-block">
    <notification-block :message="message" :error="error"></notification-block>
  </div>
  <div id="profile" class="d-flex flex-column align-items-center" style="min-height: 100vh;" v-if="init">
    <header>
			<navbar-component></navbar-component>
		</header>
  	<main class="mt-4 px-3 container-sm d-flex flex-column align-items-center flex-wrap">
      <div class="d-flex w-100 mb-3 flex-wrap justify-content-around align-items-center">
        <div class="mb-3 me-auto d-flex flex-grow-1 justify-content-center">
          <avatar-component></avatar-component>
        </div>
        <div class="mb-3 flex-grow-1">
          <profile-details></profile-details>
        </div>
      </div>
      <div class="w-100">
        <profile-locations></profile-locations>
      </div>
      <div class="w-100">
        <channels-component></channels-component>
      </div>
    </main>
    <footer-component></footer-component>
	</div>
</template>

<script lang="ts">
  import c_personalDetails from '../components/personalDetails.vue'
  import c_avatar from '../components/avatar.vue'
  import c_userLocations from '../components/userLocations.vue'
  import c_channels from '../components/channels.vue'
  import c_navbar from '../components/navbar.vue'
  import c_footer from '../components/footer.vue'
  import c_notification from '../components/notification.vue'
  import { mapGetters, mapActions } from 'vuex';
  import { defineComponent } from 'vue'
export default defineComponent({
  components:{
    'profile-details': c_personalDetails,
    'avatar-component': c_avatar,
    'profile-locations': c_userLocations,
    'channels-component': c_channels,
    'navbar-component': c_navbar,
    'footer-component': c_footer,
    'notification-block': c_notification
  },
  data() {
    return {
      message: "",
      error: false,
      init: false
    }
  },
  computed:{
    ...mapGetters('profile', [
      'avatar',
      'personal_details',
      'channels',
      'user_locations'
    ]),
    ...mapGetters('statics', [
      'locations'
    ]),
    ...mapGetters('user', [
      'is_auth'
    ])
  },
  methods: {
    ...mapActions('profile', [
      'FETCH_PROFILE'
    ]),
    ...mapActions('statics', [
      'FETCH_LOCATIONS'
    ]),
    notify(message: string, error: boolean){
      this.message = message
      this.error = error
    }
  },
  watch:{
    is_auth: function(newVal, oldVal){
      if(newVal === false){
        this.$router.push({name:'signup'})
      }
    }
  },
  created(){
    if(!this.is_auth){
      this.$router.push({name:'signup'})
    }
    else{
      this.FETCH_PROFILE()
      .then(()=>{
        this.init = true
      })
    }
  }
})
</script>
<style scoped>
#profile {
  margin: auto;
  background-color: #eee;
}

#profile header {
  margin-bottom: 5em;
}

#profile main {
  max-width: 640px;
}

.notification-block{
  position: fixed;
  top: 85%;
  left: 60%;
  z-index: 9999;
  width: 400px;
  overflow-wrap: anywhere;
}

@media(max-width: 768px) {
  .notification-block{
    width: 90vw;
    left: 5vw;
  }
}
@media(max-width: 380px) {
    main{
      margin-top: 4rem !important;
    }
  }
</style>
