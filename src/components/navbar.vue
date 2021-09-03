<template>
	<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top p-3">
    <div class="container-fluid justify-content-end">
      <logo></logo>
      <div class="dropdown me-2" style="height:max-content" ref="language-dropdown">
        <button class="lang-btn dropdown-toggle" ref="language-dropdown-btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          {{$i18n.locale.toUpperCase()}}
        </button>
        <ul class="dropdown-menu" ref="language-dropdown-list" aria-labelledby="dropdownMenuButton1">
          <div @click="setLang('en')" class="dropdown-item text-center d-flex " style="cursor: pointer">
            <div class="lang-logo" :class="{'lang-logo__active': $i18n.locale=='en'}">
              <span class="">EN</span>
            </div>
            <p class="lang-lable">English</p>
          </div>
          <div @click="setLang('de')"  class="dropdown-item text-center d-flex" style="cursor: pointer">
            <div class="lang-logo" :class="{'lang-logo__active': $i18n.locale=='de'}">
              <span class="">DE</span>
            </div>
            <p class="lang-lable">Deutch</p>
          </div>
        </ul>
      </div>
      <button class="navbar-toggler no-shadow" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse flex-grow-0 mt-3 navbar-collapse-my" id="navbarNavDropdown">
        <ul class="navbar-nav align-items-center">
          <router-link v-if="!is_auth" class="nav-item text-primary text-center fw-normal" style="min-width:fit-content" :to="{ name: 'signup'}">{{ $t('navbar_1') }}</router-link>
          <span v-if="!is_auth" class="m-2 text-secondary text-center delimeter">{{ $t('navbar_2') }}</span>
          <router-link v-if="!is_auth" class="btn btn-primary w-100" :to="{ name: 'signup'}">{{ $t('navbar_3') }}</router-link>
          <router-link v-if="is_auth" class="nav-item btn btn-lg btn-success w-100 mb-3 mobile" :to="{ name: 'profile'}">{{ $t('navbar_4') }}</router-link>
          <router-link v-if="is_auth" class="nav-item btn btn-primary btn-desktop w-100" @click.prevent="LOGOUT" :to="{ name: 'index'}">{{ $t('navbar_5') }}</router-link>
          <router-link v-if="is_auth" class="nav-avatar desktop" :to="{ name: 'profile'}">
            <img :src="avatar_url">
          </router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<i18n>
{
  "en":{
    "navbar_1":"Log in",
    "navbar_2":"or",
    "navbar_3":"SIGN UP",
    "navbar_4":"My profile",
    "navbar_5":"Log out"
  },
  "de":{
    "navbar_1":"Einloggen",
    "navbar_2":"or",
    "navbar_3":"Anmelden",
    "navbar_4":"My profile",
    "navbar_5":"Ausloggen"
  }
}
</i18n>

<script>
import { mapGetters, mapActions } from 'vuex';
import { defineComponent } from 'vue'
import logo from '@/components/logo.vue'
export default defineComponent({
    components:{
      'logo': logo
    },
    computed:{
      ...mapGetters('user', [
        'is_auth'
      ]),
      ...mapGetters('profile', [
        'avatar_url'
      ])
    },
    methods: {
      ...mapActions('user', [
        'LOGOUT'
      ]),
      setLang(lang){
        this.$i18n.locale = lang
        this.$refs['language-dropdown-btn']['aria-expanded'] = false
        this.$refs['language-dropdown-list'].classList.remove('show')
      },
      initDropdown(){
        this.$refs['language-dropdown'].addEventListener('mouseover', ()=>{
          this.$refs['language-dropdown-btn']['aria-expanded'] = true
          this.$refs['language-dropdown-list'].classList.add('show')
          
        })
        this.$refs['language-dropdown'].addEventListener('mouseleave', ()=>{
          this.$refs['language-dropdown-btn']['aria-expanded'] = false
          this.$refs['language-dropdown-list'].classList.remove('show')
        })
      }
    },
    mounted() {
      //this.initDropdown()
    },
})
</script>

<style scoped>
  .lang-logo{
    height: 3rem; 
    width: 3rem;
    padding-top: .4rem;
    font-size: 20px;
    background: whitesmoke;
    color: rgb(13,110,253);
    border: solid rgb(13,110,253) 3px;
  }
  .lang-logo__active{
    color: whitesmoke;
    background: rgb(13,110,253);
  }
  .lang-lable{
    margin: 0 0 0 5px;
    padding-top: .6rem;
    font-size: 20px;
  }
  .lang-btn{
    background: none;
    border: none;
    color: lightgrey;
    transition-duration: .1s;
  }
  .lang-btn:hover{
    opacity: 0.8;
  }
  .nav-avatar{
    border-radius:50%
  }
  .no-shadow:focus{
    box-shadow: none !important;
  }
  .navbar-collapse-my{
    flex-direction: row-reverse;
  }
  .desktop{
    display: none;
  }
  .mobile{
    display: initial;
  }
  .btn-desktop{
    padding: .5rem 1rem;
    font-size: 1.25rem;
  }

  @media(max-width: 360px) {
    .navbar-toggler{
      margin-top: 1rem;
      width: 100%;
    }
  }
  @media(min-width: 768px) {
    .delimeter{
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }
    .navbar-collapse-my{
      margin-top: 0 !important;
      flex-direction: row;
    }
    .nav-item-my{
      width: auto !important;
    }
    .nav-avatar{
      border-radius:50%;
      margin-left: 1rem;
    }
    .nav-avatar img{
      width:40px;
      height:40px;
      border-radius: 50%;
    }
    .mobile{
      display: none;
    }
    .desktop{
      display: initial;
    }
    .btn-desktop{
      padding: .375rem .75rem;
      font-size: 1rem;
    }
  }
</style>