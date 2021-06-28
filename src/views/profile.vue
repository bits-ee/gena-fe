<template>
  <div id="profile" class="d-flex flex-column" style="min-height: 100vh;">
    <header>
			<navbar-component @notify="handleNotify"></navbar-component>
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
          <avatar-component @notify="handleNotify"></avatar-component>
        </div>
        <div class="col-7 px-4">
          <profile-details @notify="handleNotify"></profile-details>
        </div>
      </div>
      <div class="row">
        <profile-locations @notify="handleNotify"></profile-locations>
      </div>
      <div class="row">
        <channels-component @notify="handleNotify"></channels-component>
      </div>
    </main>
    <footer-component @notify="handleNotify"></footer-component>
	</div> <!-- end of vuejs app -->
</template>

<script>
  import c_personalDetails from '../components/personalDetails.vue'
  import c_avatar from '../components/avatar.vue'
  import c_userLocations from '../components/userLocations.vue'
  import c_channels from '../components/channels.vue'
  import c_navbar from '../components/navbar.vue'
  import c_footer from '../components/footer.vue'
  import c_notification from '../components/notification.vue'
export default {
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
      message:null,
      error:null
    }
  },
  methods: {
    handleNotify(message, error){
      this.message = message
      this.error = error
    }
  },
  beforeCreate: function() {
        document.body.className = '';
    },
}
</script>

<style>
</style>
