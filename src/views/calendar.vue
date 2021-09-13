<template>
  <div class="wrapper" v-if="init">
    <header>
      <navbar-component></navbar-component>
    </header>

    <main class="flex-grow-1">
      <div class="container d-flex flex-column align-items-center pt-4">
        <div>
          <h2 class="">{{ $t("calendar_6") }}</h2>
          <div class="mx-auto my-4" style="width:max-content">
            <div v-if="!is_auth" class="d-flex justify-content-center align-items-center">
              <router-link v-if="!is_auth" class="nav-item text-primary text-center fw-normal" style="min-width:fit-content" :to="{ name: 'signup'}">{{ $t('calendar_1') }}</router-link>
              <span v-if="!is_auth" class="m-2 text-secondary text-center delimeter">{{ $t('calendar_2') }}</span>
              <router-link v-if="!is_auth" class="btn btn-primary" :to="{ name: 'signup'}">{{ $t('calendar_3') }}</router-link>
            </div>
            <div v-else class="d-flex flex-column justify-content-center align-items-center">
              <span class="mb-2">Go to</span>
              <router-link v-if="is_auth" class="btn btn-success mb-2" :to="{ name: 'profile'}">{{ $t('calendar_4') }}</router-link>
            </div>
            <span>{{$t('calendar_5')}}</span>
          </div>
          <div class="mb-2">
            <select class="form-select no-shadow" name="calendar_location" id="calendar_location" v-model="location" @change="FETCH_CALENDAR($event.target.value)">
              <option value="" disabled selected>Select your option</option>
              <option :key="location" v-for="location in locations" :value="location.id">{{location.display_name}}</option>
            </select>
          </div>
          <calendar 
            style="border: none" 
            :locale="{id:$i18n.locale, firstDayOfWeek:2}" 
            show-weeknumbers="left" 
            :attributes="attributes"
            :min-page="min_page"
            :max-page="max_page"
            
          >
            <!-- <template v-slot:day-content="slotProps">
              <div class="calendar-cell">
                {{slotProps.day.label}}
              </div>
            </template> -->
            <!-- <template #day-popover>
              <div>
                Using my own content now
              </div>
            </template> -->
          </calendar>
        </div>
      </div>
    </main>
    <footer-component></footer-component>
  </div>
</template>

<i18n>
{
  "en":{
    "calendar_1":"Log in",
    "calendar_2":"or",
    "calendar_3":"SIGN UP",
    "calendar_4":"PROFILE",
    "calendar_5":"to subscribe on service notifications",
    "calendar_6":"Garbage Calendar"
  },
  "de":{
    "calendar_1":"Einloggen",
    "calendar_2":"or",
    "calendar_3":"Anmelden",
    "calendar_4":"PROFILE",
    "calendar_5":"to subscribe on service notifications",
    "calendar_6":"Garbage Calendar"
  }
}
</i18n>

<script>
import { defineComponent } from 'vue'
import navbar from '../components/navbar.vue'
import footer from '../components/footer.vue'
import { Calendar } from 'v-calendar';
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
export default defineComponent({
	components:{
    'navbar-component': navbar,
    'footer-component': footer,
    'calendar': Calendar
  },
  data(){
    return {
      init: false,
      location_id: 183,
      types: {
        A: {
          name: 'General waste collection',
          description: 'Please prepare your canton bags before 7:00 AM',
          color: 'blue'
        },
        G: {
          name: 'Green waste',
          description: 'Prepare the green waste ready in containers by 7:00 a.m.',
          color: 'green'
        },
        P: {
          name: 'Paper',
          description: 'Prepare your paper in bundles by 7.00 a.m.',
          color: 'teal'
        },
        M: {
          name: 'Metall',
          description: 'Prepare your  metal objects (pans, nails, wire, etc.) as well as larger objects up to 100 cm in length and 40 kg in weight ready by 7.00 a.m. at the garbage disposal.',
          color: 'gray'
        },
        K: {
          name: 'Carton',
          description: 'Prepare your old carton bundled and tied ready for collection by 7 a.m.',
          color: 'orange'
        },
        D: {
          name: 'Landfill goods',
          description: 'Non-combustible, mineral materials such as stones, mirrors, Eternit, clay pots, dishes, window glass, bricks etc. are taken by the landfill waste collection.',
          color: 'purple'
        },
        H: {
          name: 'Chopping service',
          description: 'Registration for the shredding service from {Wednesday April 15, 2020} Chopped up shredded material: is left lying around',
          color: 'yellow'
        },
        S: {
          name: 'Hazardous waste',
          description: 'Hazardous waste up to a maximum of 20kg per person and year www.sonderabfall.zh.ch.',
          color: 'red'
        },
        L: {
          name: 'Elevator',
          description: 'Every 2 years. Next appointment in 2021.',
          color: 'orange'
       }
      }
    }
  },
  methods:{
    ...mapActions('statics', [
      'FETCH_CALENDAR',
      'FETCH_LOCATIONS'
    ])
  },
  computed: {
    ...mapGetters('statics', [
      'calendar',
      'locations'
    ]),
    ...mapGetters('user', [
      'is_auth'
    ]),
    attributes() {
      if(!this.calendar) return []
      return [
        ...this.calendar.map(function(event){
          return {
            dates: new Date(event.date),
            bar: this.types[event.type].color,
            popover: {
              label: this.types[event.type].name
            },
          }
        }, this)
      ];
    },
    min_page(){
      let date = new Date(_.orderBy(this.calendar, ['date'])[0].date)
      return {month:date.getUTCMonth() + 1, year:date.getUTCFullYear()}
    },
    max_page(){
      let date = new Date(_.orderBy(this.calendar, ['date'])[this.calendar.length-1].date)
      return {month:date.getUTCMonth() + 1, year:date.getUTCFullYear()}
    }
  },
  async mounted(){
    Promise.allSettled([
      this.FETCH_LOCATIONS(),
      this.FETCH_CALENDAR(this.location_id)
    ]).then(()=>{
      this.init = true
    })
  }
})
</script>
<style>
  .vc-day{
    width: 10vw;
    height: 10vh;
  }
</style>
<style scoped>
.wrapper{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.calendar-cell{
  text-align: center;
}
.no-shadow:focus{
  box-shadow: none !important;
}
main{
  margin-top: 4.7rem;
}

@media(max-width: 380px) {
    main{
      margin-top: 10rem !important;
    }
  }
</style>