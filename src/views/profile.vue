<template>
  <div id="profile" class="d-flex flex-column" style="min-height: 100vh;">
    <header>
			<navbar-component></navbar-component>
		</header>
    <div class="container-sm">
      <notification-block :message="message" :error="error"></notification-block>
    </div>
  	<main class="container-sm">
      <div class="row mb-5">
        <h1>My account</h1>
      </div>
      <div class="row">
        <div class="col-5">
          <avatar-component></avatar-component>
        </div>
        <div class="col-7 px-4">
          <profile-details v-if="personal_details"></profile-details>
        </div>
      </div>
      <div class="row">
        <profile-locations v-if="user_locations&&channels&&locations"></profile-locations>
      </div>
      <div class="row">
        <channels-component v-if="channels"></channels-component>
      </div>
    </main>
    <footer-component></footer-component>
	</div> <!-- end of vuejs app -->
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
      error: false 
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
    ])
  },
  methods: {
    ...mapActions('profile', [
      'FETCH_AVATAR',
      'FETCH_DETAILS',
      'FETCH_CHANNELS',
      'FETCH_USER_LOCATIONS',
      'FETCH_LOCATION_SERVICES',
    ]),
    ...mapActions('statics', [
      'FETCH_LOCATIONS'
    ]),
    notify(message: string, error: boolean){
      this.message = message
      this.error = error
    }
  },
  beforeCreate() {
    document.body.className = '';
  },
  created(){
    Promise.allSettled([
      this.FETCH_LOCATIONS(),
      this.FETCH_AVATAR(),
      this.FETCH_DETAILS(),
      this.FETCH_CHANNELS(),
      this.FETCH_USER_LOCATIONS()
    ])
  }
})
</script>

<style>
</style>
