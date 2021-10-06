<template>
    <div>
        <h3 class="text-nowrap">{{$t('personalDetails_1')}}</h3>
        <div>
          <div class="container m-0 p-0"  style="min-width: 300px">
            <div class="form-group row mb-2">
              <div class="col-4">
                <label class="text-nowrap" for="firstname">{{$t('personalDetails_2')}}</label>
              </div>
              <div class="col-8">
                <input type="text" class="w-100" id="firstname" v-model="personal_details_copy.firstname" ref="firstname">
              </div>
            </div>
            <div class="form-group row mb-2">
              <div class="col-4">
                <label class="text-nowrap" for="lastname">{{$t('personalDetails_3')}}</label>
              </div>
              <div class="col-8">
                <input  class="w-100" type="text" id="lastname" v-model="personal_details_copy.lastname" ref="lastname">
              </div>
            </div>
            <div class="form-group row mb-2">
              <div class="col-4">
                <label class="text-nowrap" for="language">{{$t('personalDetails_4')}}</label>
              </div>
              <div class="col-8">
                <!-- TODO: profile language will sync with page languge when backend is ready  -->
                <select v-model="personal_details_copy.language" id="language" ref="language" style="height:30px">
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                </select>
              </div>
            </div>
            <div class="w-100">
              <input type="submit" class="btn btn-block btn-outline-primary w-100" :value="$t('personalDetails_5')" @click="onSubmit">
            </div>
          </div>
        </div>
    </div>
</template>

<i18n>
{
  "en":{
    "personalDetails_1":"Personal Details",
    "personalDetails_2":"First name",
    "personalDetails_3":"Last name",
    "personalDetails_4":"Language",
    "personalDetails_5":"Send"
  },
  "de":{
    "personalDetails_1":"Personal Details",
    "personalDetails_2":"First name",
    "personalDetails_3":"Last name",
    "personalDetails_4":"Language",
    "personalDetails_5":"Send"
  }
}
</i18n>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex';
import '@/types/PersonalDetails'
export default defineComponent({
  data(){
    return{
      personal_details_copy: <PersonalDetails>{}
    }
  },
  watch:{
    personal_details: function(newVal, oldVal){
      console.log('watch details');
      
      this.personal_details_copy = Object.assign(this.personal_details_copy, newVal)
    }
  },
  computed:{
    ...mapGetters('profile', [
      'personal_details',
    ]),
  },
  methods: {
    ...mapActions('profile', [
      'FETCH_DETAILS',
      'UPDATE_DETAILS',
    ]),
    onSubmit(){
      this.UPDATE_DETAILS(this.personal_details_copy)
      .catch(()=>{
        Object.assign(this.personal_details_copy, this.personal_details)
      })
    }
  },
  mounted(){
    //way to get clone of a OBJECT, not reference 
    Object.assign(this.personal_details_copy, this.personal_details)
  }
})
</script>
