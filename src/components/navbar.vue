<template>
	<nav class="navbar navbar-dark bg-dark fixed-top px-5">
		<router-link class="navbar-brand me-md-auto" :to="{ name: 'index'}">
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
				<path d="m0 0h32v32h-32z" fill="#da291c"/>
				<path d="m13 6h6v7h7v6h-7v7h-6v-7h-7v-6h7z" fill="#fff"/>
			</svg>
			<span class="h5 ms-1">Gemeinde Online</span>
		</router-link>
    <div class="lang-wrapper">
      <div class="dropdown dropdown-my" ref="language-dropdown">
        <button class="lang btn btn-primary dropdown-toggle" ref="language-dropdown-btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          {{$i18n.locale.toUpperCase()}}
        </button>
        <ul class="dropdown-menu py-0 lang-list" ref="language-dropdown-list" aria-labelledby="dropdownMenuButton1">
          <div @click="$i18n.locale='en'" class="dropdown-item lang-item">              <!-- TODO: click function will change when backend is ready -->
            <div class="lang btn" :class="$i18n.locale=='en'?'btn-primary':''">EN</div>
            <p class="lang-lable">English</p>
          </div>
          <div @click="$i18n.locale='de'"  class="dropdown-item lang-item">
            <div class="lang btn" :class="$i18n.locale=='de'?'btn-primary':''">DE</div>
            <p class="lang-lable">Deutsch</p>
          </div>
        </ul>
      </div>

    </div>
		<router-link v-if="!is_auth" class="me-4 sign-in" :to="{ name: 'signup'}">{{ $t('navbar_1') }}</router-link>
		<router-link v-if="!is_auth" class="btn btn-primary register" :to="{ name: 'signup'}">{{ $t('navbar_2') }}</router-link>
    <router-link v-if="is_auth" class="btn btn-primary" @click.prevent="LOGOUT" :to="{ name: 'index'}">{{ $t('navbar_3') }}</router-link>
	</nav>
</template>

<i18n>
{
  "en":{
    "navbar_1":"Sign in",
    "navbar_2":"Register",
    "navbar_3":"Log out"
  },
  "de":{
    "navbar_1":"Einloggen",
    "navbar_2":"Anmelden",
    "navbar_3":"Ausloggen"
  }
}
</i18n>

<script>
import { mapGetters, mapActions } from 'vuex';
import { defineComponent } from 'vue'
export default defineComponent({
    computed:{
      ...mapGetters('user', [
        'is_auth'
      ])
    },
    methods: {
      ...mapActions('user', [
        'LOGOUT'
      ]),
      setLang(lang){
        this.$i18n.locale = lang
      },
      initDropdown(){
        this.$refs['language-dropdown'].addEventListener('mouseover', ()=>{
          this.$refs['language-dropdown-btn']['aria-expanded'] = true
          this.$refs['language-dropdown-btn'].classList = 'lang btn btn-primary dropdown-toggle show'
          this.$refs['language-dropdown-list'].classList = 'dropdown-menu py-0 lang-list show'
          this.$refs['language-dropdown-list']['data-bs-popper'] = 'none'
        })
        this.$refs['language-dropdown'].addEventListener('mouseleave', ()=>{
          this.$refs['language-dropdown-btn']['aria-expanded'] = false
          this.$refs['language-dropdown-btn'].classList = 'lang btn btn-primary dropdown-toggle'
          this.$refs['language-dropdown-list'].classList = 'dropdown-menu py-0 lang-list'
          delete this.$refs['language-dropdown-list']['data-bs-popper']
        })
      }
    },
    mounted() {
      this.initDropdown()
    },
})
</script>

<style>
  .lang{
    font-family: Roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    border: solid #0d6efd 3px;
    margin-right: 0.7em;
  }
  .lang::after{
    content: none;
  }
  .lang-wrapper{
    display: flex;
    margin-right: 2em;
  }
  .lang-item{
    cursor: pointer;
    display: flex;
  }
  .lang-item:hover .lang{
    color: #fff;
    background-color: #0d6efd;
  }
  .lang-lable{
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 55px;
    letter-spacing: 0.6499999761581421px;
    text-align: left;
    padding: 0;
    margin: 0;
  }
  .dropdown-my{
    width: 50px;
    height: 50px;
  }

  .sign-in{
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 48px;
    letter-spacing: 0.6499999761581421px;
    text-align: center;
  }

  .register{
    font-family: Roboto;
    font-size: 18px;
  }

  @media(max-width: 480px) {
    .lang{
      margin: 0;
    }
    .lang-lable{
      display: none;
    }
    .lang-list{
      min-width: max-content;
    }
  }
</style>