<template>
  <div>
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
 export default {
    components: {
      'tg-login': c_tgLogin,
      'email-login': c_emailLogin,
      'logo-link': c_logo
    },
    beforeCreate: function() {
        document.body.className = 'body-signup';
    },
    mounted() {
      /*
      this.directive('visible', function(el, binding) {
        el.style.visibility = !!binding.value ? 'visible' : 'hidden';
      });
      */
    },
  };
</script>
 
<style scoped>
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

