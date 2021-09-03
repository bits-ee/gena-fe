<template>
	<div>
		<div class="needs-validation" novalidate>

      <div v-if="state=='wait'">
        <div class="d-flex justify-content-center mb-3">
          <div class="align-items-center lds-facebook"><div></div><div></div><div></div></div>
        </div>
			</div>

      <div v-if="state=='input'">
        <div class="mb-3">
          <div>
            <input type="email" class="form-control form-control-sm" :class="{'is-invalid':errors.length}" :placeholder="$t('emailLogin_2')" aria-describedby="emailHelp" v-model="email" required>
          </div>
        </div>
        <div>
            <button role="button" class="btn btn-primary btn-sm w-100" v-on:click="submit()">{{$t('emailLogin_1')}}</button>
        </div>
      </div>

      <div v-if="state=='verify'">
        <div class="">
          <p class="text-center">{{$t('emailLogin_3')}}</p>
          <input type="text" class="form-control form-control-sm mb-2" v-model="verification_code">
          <div>
            <button class="btn btn-primary btn-sm mb-1 w-100" v-on:click="is_channel?verifyChannel(verification_code):verify(verification_code)">{{$t('emailLogin_4')}}</button>
            <button class="btn btn-secondary btn-sm w-100" v-on:click="setState('input')">{{$t('emailLogin_5')}}</button>
          </div>
        </div>
      </div>

      <div v-if="state=='error'">
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>{{message==""?$t('emailLogin_6'):message}}</strong>
          <button v-on:click="setState(last_state)" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>

		</div>
	</div>
</template>

<i18n>
{
  "en":{
    "emailLogin_1":"Continue",
    "emailLogin_2":"E-mail address",
    "emailLogin_3":"Please, enter code from email",
    "emailLogin_4":"Verify",
    "emailLogin_5":"Back",
    "emailLogin_6":"Something goes wrong. Please, try again"
    
  },
  "de":{
    "emailLogin_1":"Continue",
    "emailLogin_2":"E-mail address",
    "emailLogin_3":"Please, enter code from email",
    "emailLogin_4":"Verify",
    "emailLogin_5":"Back",
    "emailLogin_6":"Something goes wrong. Please, try again"
  }
}
</i18n>

<script lang="ts">
declare var grecaptcha: any;
import { defineComponent } from 'vue'
import { mapGetters, mapActions, mapMutations } from 'vuex';
import '@/types/RegData'
	export default defineComponent({
    props:{
      is_channel:{
        type: Boolean,
        default: false
      }
    },
		data() {
			return {
				errors: [] as String[],
				message: "",
				email: "",
        state: "input",
        recaptcha_script: {} as HTMLScriptElement,
        verification_code: "",
        last_state:"input"
			}
		},
    computed:{
      ...mapGetters('config', [
        'googleRecaptchaKey',
      ])
    },
		methods: {
      ...mapActions('user', [
        'VERIFY_EMAIL',
        'REG_EMAIL'
      ]),
      ...mapActions('profile', [
        'VERIFY_EMAIL_CHANNEL',
        'ADD_EMAIL_CHANNEL'
      ]),
      ...mapMutations('user', [
        'setKey'
      ]),
			submit() {
        let regex = new RegExp('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])')
				this.errors = []
				if(!(regex.test(this.email))){
					this.errors.push('email is bad')
					return false
				}
        this.setState('wait');
        grecaptcha.execute(this.googleRecaptchaKey, {action: 'submit'}).then((token: string) => {
          let reg_data = <RegData>{
            email: this.email,
            token: token,
            lang: this.$i18n.locale
          }
          if(this.is_channel){
            this.ADD_EMAIL_CHANNEL(this.email)
            .then((response: any) => {
              this.setState('verify')
            })
            .catch((err) => {
              this.setState('error', err.response.data.error)
            })
          }
          else{
            this.REG_EMAIL(reg_data)
              .then((response: any) => {
                this.setState('verify')
              })
              .catch((err) => {
                this.setState('error', err.response.data.error)
              })
          }
        });
			},
      verify(secretKey: string){
        this.setState('wait')
        this.VERIFY_EMAIL(secretKey)
          .then((response: any) => {
          })
          .catch((err) => {
            this.setState('error', err.response.data.error)
          });
      },
      verifyChannel(secretKey: string){
        this.VERIFY_EMAIL_CHANNEL(secretKey)
      },
      setState(state: string, message?: string){
        if(this.state=='input' || this.state=='verify') this.last_state = this.state
        this.message = message??""
        this.state = state
      },

      initRecaptcha(){
        (window as any).grecaptchaCallBack = ()=>{
          if(this.$route.name=="profile") document.getElementsByClassName('grecaptcha-badge')[0].classList.add('grecaptcha-profile')
        }
        this.recaptcha_script = document.createElement('script');
        this.recaptcha_script.src = "https://www.google.com/recaptcha/api.js?render="+this.googleRecaptchaKey+"&onload=grecaptchaCallBack"
        document.getElementById('app')?.appendChild(this.recaptcha_script)
      }
		},
    watch:{
      $route: function(to, from){
        document.getElementsByClassName('grecaptcha-badge')[0].remove()
      }
    },
		mounted(){
      this.initRecaptcha()
      if (this.$route.name=='verify' && this.$route.params.secretKey) {
        this.verify(<string>this.$route.params.secretKey);
      }
      if(this.state == "") {
        this.setState('input')
      }
		}
	})
</script>
<style>
  .grecaptcha-profile{
    visibility: hidden !important;
  }
</style>
<style scoped>
	#location_name::first-letter {
		text-transform: uppercase;
		color: red;
	}
	#modalLabel_location{
		margin-right: 5px;
	}
  .lds-facebook {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-facebook div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background: #EEE;
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }
  .lds-facebook div:nth-child(1) {
    left: 8px;
    animation-delay: -0.24s;
  }
  .lds-facebook div:nth-child(2) {
    left: 32px;
    animation-delay: -0.12s;
  }
  .lds-facebook div:nth-child(3) {
    left: 56px;
    animation-delay: 0;
  }
  .email-img{
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15px;
    width: 50%;
  }

  @keyframes lds-facebook {
    0% {
      top: 8px;
      height: 64px;
    }
    50%, 100% {
      top: 24px;
      height: 32px;
    }
  }

</style>
