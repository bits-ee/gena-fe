<template>
    <div>
        <h3>{{$t('userLocations_1')}}</h3>
        <div class="accordion mb-4" id="accordionLocations">
            <div class="accordion-item" :key="user_location.id" v-for="user_location in user_locations_copy">
                <h4 class="accordion-header" :id="'heading'+user_location.id">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#location'+user_location.id" aria-expanded="false" :aria-controls="'location'+user_location.id">
                        <h4>{{user_location.title==''?$t('userLocations_2'):user_location.title}}</h4>
                    </button>
                </h4>
                <div :id="'location'+user_location.id" class="accordion-collapse collapse" :aria-labelledby="'heading'+user_location.id" data-bs-parent="#accordionLocations">
                    <div class="accordion-body">
                        <div>
                            <div class="form-group d-flex mb-4">
                                <div class="me-3" style="min-width:fit-content">
                                    <img class="form-img" src="../assets/images/profile/home.png" :alt="$t('userLocations_3')">
                                </div>
                                <div class="flex-grow-1">
                                    <input style="width:100%" type="text" v-model="user_location.title" :placeholder="$t('userLocations_4')">
                                </div>
                            </div>
                            <div class="form-group d-flex mb-4">
                                <div class="me-3" style="min-width:fit-content">
                                    <img class="form-img" src="../assets/images/profile/zip.png" :alt="$t('userLocations_5')">      
                                </div>
                                <div class="flex-grow-1">
                                    <tomSelect :viewSearchButton="false" v-if="locations" :locations="locations" :selectedValue="parseInt(user_location.location_id)" @tsChanged="user_location.location_id=$event; FETCH_LOCATION_SERVICES(user_location)"></tomSelect>
                                </div>
                            </div>
                            
                            <div class="form-group d-flex mb-4">
                                <div class="me-3" style="min-width:fit-content">
                                    <img class="form-img" src="../assets/images/profile/location.png" :alt="$t('userLocations_6')">
                                </div>
                                <div class="flex-grow-1 d-flex justify-content-between">
                                    <input style="width:70%" type="text" :placeholder="$t('userLocations_7')" v-model="user_location.street_name">
                                    <input style="width:26%" type="text" :placeholder="$t('userLocations_8')" v-model="user_location.street_number">
                                </div>
                            </div>
                            <locationServices :services="user_location.services" :channels="channels"></locationServices>
                            <div class="d-flex flex-column justify-content-end">
                                <button class="btn btn-primary btn-sm" v-on:click="UPDATE(user_location)">{{$t('userLocations_9')}}</button>
                                <button class="btn btn-outline-danger btn-sm mt-3" v-on:click="DELETE(user_location)">{{$t('userLocations_10')}}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="accordion-item mt-1">
                <h4 class="accordion-header" :id="'heading_add'">
                    <button class="btn btn-block btn-outline-primary add-btn" type="button" data-bs-toggle="collapse" :data-bs-target="'#location_add'" aria-expanded="false" :aria-controls="'location_add'">
                        <h3>+</h3>
                    </button>
                </h4>
                <div :id="'location_add'" class="accordion-collapse collapse" :aria-labelledby="'heading_add'" data-bs-parent="#accordionLocations">
                    <div class="accordion-body">
                        <div>
                            <div class="form-group d-flex mb-4">
                                <div class="me-3" style="min-width:fit-content">
                                    <img class="form-img" src="../assets/images/profile/home.png" :alt="$t('userLocations_3')">
                                </div>
                                <div class="flex-grow-1">
                                    <input style="width:100%" type="text" v-model="new_location.title" :placeholder="$t('userLocations_4')">
                                </div>
                            </div>
                            <div class="form-group d-flex mb-4">
                                <div class="me-3" style="min-width:fit-content">
                                    <img class="form-img" src="../assets/images/profile/zip.png" :alt="$t('userLocations_5')">      
                                </div>
                                <div class="flex-grow-1">
                                    <tomSelect :viewSearchButton="false" v-if="locations" :locations="locations" :selectedValue="parseInt(new_location.location_id)" @tsChanged="new_location.location_id=$event; FETCH_LOCATION_SERVICES(new_location)"></tomSelect>
                                </div>
                            </div>
                            
                            <div class="form-group d-flex mb-4">
                                <div class="me-3" style="min-width:fit-content">
                                    <img class="form-img" src="../assets/images/profile/location.png" :alt="$t('userLocations_6')">
                                </div>
                                <div class="flex-grow-1 d-flex justify-content-between">
                                    <input style="width:70%" type="text" :placeholder="$t('userLocations_7')" v-model="new_location.street_name">
                                    <input style="width:26%" type="text" :placeholder="$t('userLocations_8')" v-model="new_location.street_number">
                                </div>
                            </div>
                            <locationServices :services="new_location.services" :channels="channels"></locationServices>
                            <div class="d-flex justify-content-end">
                                <button class="btn btn-primary btn-sm" v-on:click="ADD()">{{$t('userLocations_11')}}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div> 
    </div>
</template>

<i18n>
{
  "en":{
    "userLocations_1":"My Locations",
    "userLocations_2":"Untitled",
    "userLocations_3":"Title",
    "userLocations_4":"Location title",
    "userLocations_5":"Location",
    "userLocations_6":"Address",
    "userLocations_7":"Street name",
    "userLocations_8":"Street number",
    "userLocations_9":"Apply",
    "userLocations_10":"Delete",
    "userLocations_11":"Add"
  },
  "de":{
    "userLocations_1":"My Locations",
    "userLocations_2":"Untitled",
    "userLocations_3":"Title",
    "userLocations_4":"Location title",
    "userLocations_5":"Location",
    "userLocations_6":"Address",
    "userLocations_7":"Street name",
    "userLocations_8":"Street number",
    "userLocations_9":"Apply",
    "userLocations_10":"Delete",
    "userLocations_11":"Add"
  }
}
</i18n>

<script lang="ts">
import { defineComponent } from 'vue'
import tomSelect from './tomSelect.vue'
import locationServices from './locationService.vue'
import { mapGetters, mapActions } from 'vuex';
import '@/types/UserLocation'
import _ from 'lodash'
export default defineComponent({
    components: {
        'tomSelect': tomSelect,
        'locationServices': locationServices
    },
    data(){
        return {
            new_location: {
                title: ''
            } as UserLocation,
            user_locations_copy: {} as UserLocation[]
        }
    },
    watch:{
        user_locations: {
            handler(newVal){
                this.user_locations_copy = JSON.parse(JSON.stringify(newVal))
            },
            deep: true,
        }
    },
    computed:{
        ...mapGetters('profile', [
            'channels',
            'user_locations'
        ]),
        ...mapGetters('statics', [
            'locations',
        ])
    },
    methods: {
        ...mapActions('profile', [
            'FETCH_USER_LOCATIONS',
            'UPDATE_USER_LOCATION',
            'DELETE_USER_LOCATION',
            'ADD_USER_LOCATION',
            'FETCH_LOCATION_SERVICES',
        ]),
        UPDATE(location: UserLocation){
            this.UPDATE_USER_LOCATION(location)
            .catch(()=>{
                this.user_locations_copy = JSON.parse(JSON.stringify(this.user_locations))
            })
        },
        DELETE(location: UserLocation){
            this.DELETE_USER_LOCATION(location)
        },
        ADD(){
            this.ADD_USER_LOCATION(this.new_location)
            .then(()=>{
                this.new_location = {
                    title: ''
                } as UserLocation
            })
        }
    },
    mounted(){
        //way to get clone of an ARRAY OF OBJECTS, not reference 
        this.user_locations_copy = JSON.parse(JSON.stringify(this.user_locations))
    }
})
</script>
<style scoped>
    button:active:focus, button:active, button:focus, input:active:focus, input:active, input:focus {
        box-shadow: none !important;
    }   
    .add-btn{
        height: 100%;
        width: 100%;
    }
    .form-img{
        height: 25px;
        width: 25px; 
    }
    .arrow{
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    }
    .ts-input{
        width: 100%;
        padding: 0;
    }
    .item, .ts-input input{
        width: 100%;
        height: 28px;
        padding: 1px 2px !important;
        font-size: 15px;
        line-height: 26px;
        border-color: rgb(118, 118, 118);
    }
    .ts-input.focus {
        box-shadow: none;
    }
    .ts-control.single .ts-input:after {
        content: none;
        margin: 0;
    }
    .ts-control{
        height: 30px;
        padding: 0;
        margin: 0;
        border-color: rgb(118, 118, 118);
    }
</style>