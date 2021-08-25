<template>
  <div class="signup">
    <div class="signup-wrapper">
      <header>
        <logo-link></logo-link>
      </header>
      <main>
      <email-login></email-login><!-- TODO merge with verify -->
        <div class="divider">
          <hr/><span>{{$t('or')}}</span><hr />
        </div>
        <div id="sso">
          <tg-login></tg-login>
        </div>
      </main>
    </div>
  </div>
</template>
<i18n>
{
  "en":{
    "or":"or"
  },
  "de":{
    "or":"oder"
  }
}
</i18n> 
<script id="vuescript">
  import c_tgLogin from '../components/tgLogin.vue'
  import c_emailLogin from '../components/emailLogin.vue'
  import c_logo from '../components/logo.vue'
  import { defineComponent } from 'vue'
 export default defineComponent({
    components: {
      'tg-login': c_tgLogin,
      'email-login': c_emailLogin,
      'logo-link': c_logo
    },
    mounted() {
      /*
      this.directive('visible', function(el, binding) {
        el.style.visibility = !!binding.value ? 'visible' : 'hidden';
      });
      */
    },
  });
</script>
 
<style scoped>
  .signup {
    width: 100vw;
    height: 100vh;
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
    position: relative;
    border-radius: 5px;
    width: 300px;
    top: 200px;
    left: 200px;
    padding: 20px;
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
</style>

