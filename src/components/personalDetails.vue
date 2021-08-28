<template>
    <div>
        <h3>{{$t('personalDetails_1')}}</h3>
        <form @submit.prevent="onSubmit()" action="POST">
          <div class="container m-0 p-0">
            <div class="form-group row mb-2">
              <div class="col-4">
                <label for="firstname">{{$t('personalDetails_2')}}</label>
              </div>
              <div class="col-8">
                <input type="text" id="firstname" v-model="personal_details_copy.firstname" ref="firstname">
              </div>
            </div>
            <div class="form-group row mb-2">
              <div class="col-4">
                <label for="lastname">{{$t('personalDetails_3')}}</label>
              </div>
              <div class="col-8">
                <input type="text" id="lastname" v-model="personal_details_copy.lastname" ref="lastname">
              </div>
            </div>
            <div class="form-group row mb-2">
              <div class="col-4">
                <label for="language">{{$t('personalDetails_4')}}</label>
              </div>
              <div class="col-8">
                <!-- TODO: profile language will sync with page languge when backend is ready  -->
                <select v-model="personal_details_copy.language" ref="language">
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                </select>
              </div>
            </div>
            <div class="row">
              <input type="submit" class="btn btn-block btn-outline-primary">
            </div>
          </div>
        </form>
    </div>
</template>

<i18n>
{
  "en":{
    "personalDetails_1":"Personal details",
    "personalDetails_2":"First name",
    "personalDetails_3":"Last name",
    "personalDetails_4":"Language"
  },
  "de":{
    "personalDetails_1":"Personal details",
    "personalDetails_2":"First name",
    "personalDetails_3":"Last name",
    "personalDetails_4":"Language"
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
      personal_details_copy: {} as PersonalDetails
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
