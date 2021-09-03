<template>
  <div class="signup">
    <router-link class="btn btn-outline-primary back-btn stiky" :to="{ name: 'index'}" role="button">{{$t('signup_1')}}</router-link>
    <div class="signup-wrapper">
      <header>
        <logo-link></logo-link>
      </header>
      <main v-if="!is_auth">
        <email-login></email-login><!-- TODO merge with verify -->
        <div class="divider">
          <hr/><span>{{$t('signup_2')}}</span><hr />
        </div>
        <div id="sso">
          <tg-login></tg-login>
        </div>
      </main>
      <main v-else>
        <div class="mb-2">You already signed up</div>
        <router-link class="nav-item btn btn-success w-100 mb-3" :to="{ name: 'profile'}">{{ $t('signup_3') }}</router-link>
      </main>
    </div>
    <div class="shifter"></div>
  </div>
</template>
<i18n>
{
  "en":{
    "signup_1":"Back",
    "signup_2":"or",
    "signup_3":"My profile"
  },
  "de":{
    "signup_1":"Back",
    "signup_2":"oder",
    "signup_3":"My profile"
  }
}
</i18n> 
<script id="vuescript">
  import c_tgLogin from '../components/tgLogin.vue'
  import c_emailLogin from '../components/emailLogin.vue'
  import c_logo from '../components/logo.vue'
  import { defineComponent } from 'vue'
  import { mapGetters } from 'vuex';
 export default defineComponent({
    components: {
      'tg-login': c_tgLogin,
      'email-login': c_emailLogin,
      'logo-link': c_logo
    },
    computed:{
      ...mapGetters('user',[
        'is_auth'
      ])
    }
  });
</script>
<style scoped>
  .signup {
    width: 100vw;
    height: 100vh;
    display: flex;
    background: url(../assets/images/signinup.jpg) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    overflow: auto;
  }
  .signup-wrapper {
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    border-radius: 5px;
    margin: auto;
    padding: 20px;
    width: 25%;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .signup header{
    margin-bottom: 1em;
  }
  .signup header a{
    text-decoration: none;
  }
  .divider {
    margin-top: 2em;
    width: 100%;
    text-align: center;
  }

  .divider span {
    padding: 0 20px;
    font-size: 16px;
    position: relative;
    top: -0.6em;
  }

  .divider hr {
    display: inline-block;
    width: 33%;
  }

  #sso {
    text-align: center;
  }

  .back-btn{
    position: absolute;
    top: 10px;
    left: 10px;
    height: max-content;
  }

  .shifter{
    width: 0;
  }

  @media(min-width: 768px) {
  .shifter{
    width: 35%;
  } 
  }
</style>

