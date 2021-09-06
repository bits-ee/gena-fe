<template id="locator-component">
<div>
  <div class="text-center">
    <h2>{{$t('locator_1')}}</h2>
  </div>

  <div class="row g-0 mt-3">
    <div class="col-lg-9">
        <div id="mapWrapper" ref="mapWrapper"></div>
    </div>

    <div class="col-lg-3 bg-dark p-4 text-white">
        <div id="signupform">
            <em class="fs-6">{{$t('locator_2')}}</em>
            <div class="clearfix mt-5">
                <h4 class="float-start">{{$t('locator_3')}}t</h4>
                <div class="mt-1 float-end"><!-- <a class="link-light" href="#">finde mich</a> --></div>
            </div>
            <form class="d-flex" @submit.prevent="submit">
                <tomSelect ref="ts" v-if="locations_all" :locations="locations_all" @tsChanged="showServicesAtLocation"></tomSelect>
            </form>
            <div v-if="noService.msg" class="mt-2">😞 {{$t('locator_4.1')}} <em>{{noService.location.display_name}}</em>. {{$t('locator_4.2')}} <a :href="locationRequestForm+noService.location.display_name">{{$t('locator_4.3')}}</a> {{$t('locator_4.4')}}</div>
        </div>
    </div>

  </div>
</div>
</template>

<i18n>
{
  "en":{
    "locator_1":"Es gibt schon 100 Gemeinden online",
    "locator_2":"Entdecken Sie Dienstleistungen in Ihrer Gemeinde und verbinden Sie sich mit Nachbarn, regionale Unternehmen und Verwaltung in einer Minute.",
    "locator_3":"Mein Wohnort",
    "locator_4":{
        "1":"At the moment we are not offering any services in ",
        "2":"Please",
        "3":"let us know",
        "4":"you are interested and we will notify you once we extend our service to your location."
    }
  },
  "de":{
    "locator_1":"Es gibt schon 100 Gemeinden online",
    "locator_2":"Entdecken Sie Dienstleistungen in Ihrer Gemeinde und verbinden Sie sich mit Nachbarn, regionale Unternehmen und Verwaltung in einer Minute.",
    "locator_3":"Mein Wohnort",
    "locator_4":{
        "1":"At the moment we are not offering any services in ",
        "2":"Please",
        "3":"let us know",
        "4":"you are interested and we will notify you once we extend our service to your location."
    }
  }
}
</i18n>

<script>
import c_tomSelect from './tomSelect.vue';
import { mapGetters, mapActions } from 'vuex';
import { defineComponent } from 'vue'
export default defineComponent({
    components: {
        'tomSelect': c_tomSelect
    },
    data() {
        return {
            mapScript: null,
            map: {
                el: null,
                center: {
                    lat: 46.8095955,
                    lng: 8.1032295
                },
                zoom: 7.5,
                markersDropped: false,
                markers: [],
                infowindow: null,
            },
            noService: {
                location: null,
                msg: false
            },
            debounce: _.debounce(this.dropMarkers, 150, { 'leading': true })
        }
    },
    async mounted() {
        await Promise.allSettled([
            this.FETCH_LOCATIONS(),
            this.FETCH_ALL_LOCATIONS(),
        ])
        this.initMap();
        window.addEventListener("scroll", this.debounce);
    },

    computed: {
        ...mapGetters('statics', [
            'locations',
            'locations_all',
            'guest_location'
        ]),
        ...mapGetters('config', [
            'googleMapKey',
            'locationRequestForm'
        ]),
        getLocale() {
            return this.$i18n.locale;
        }
    },

    watch: {
        getLocale() {
            this.reloadMap()
        },
        $route (to, from){
            window.removeEventListener("scroll", this.debounce)
            this.removeMap()
        }
    },

    methods: {
        ...mapActions('statics', [
            'FETCH_LOCATIONS',
            'FETCH_ALL_LOCATIONS',
            'FETCH_SERVICES'
        ]),

        initMap() {
            this.mapScript = document.createElement('script')
            this.mapScript.onload = ()=>{
                this.map.el = new google.maps.Map(
                    this.$refs.mapWrapper,
                    {
                        center: this.map.center,
                        zoom: this.map.zoom
                    }
                );
            };
            let key = process.env.NODE_ENV=="local"?"":"key="+this.googleMapKey+"&"
            this.mapScript.src = 'https://maps.googleapis.com/maps/api/js?'+key+'language='+this.$i18n.locale;
            this.mapScript.id = 'google-maps-script'
            document.getElementById('app').after(this.mapScript)
        },

        reloadMap(){
            this.mapScript.parentNode.removeChild(this.mapScript)
            delete google.maps;
            this.initMap()
        },

        removeMap(){
            this.mapScript.parentNode.removeChild(this.mapScript)
            delete google.maps;
        },


        dropMarkers() {
            if(!this.checkMapInViewport() || this.map.markersDropped) {
                return;
            }
            let m = null;
            for(let i in this.locations) {
                let zip = this.locations[i].zipcode;
                let id = this.locations[i].id;
                setTimeout(() => {
                    m = new google.maps.Marker({
                        position: new google.maps.LatLng(this.locations[i].lat,this.locations[i].lng),
                        map: this.map.el,
                        zipcode: zip,
                        animation: google.maps.Animation.DROP,
                        id: id
                    });
                    this.map.markers[id] = m;
                    m.addListener("click", () => {
                        this.openInfoWindow(this.map.markers[id]);
                    });
                }, i*250);
            }
            this.map.markersDropped = true;
        },

        async openInfoWindow(marker) {
            this.closeInfoWindow();
            let content = await this.getInfoWindowContent(marker.zipcode);
            const iw = new google.maps.InfoWindow({
                content: content
            });
            this.map.infowindow = iw;
            iw.open(this.map.el, marker);
        },

        async getInfoWindowContent(zipcode) {
            try {
                const response = await this.FETCH_SERVICES(zipcode);
                const location = response.data.location;
                const services = response.data.services;
                localStorage.setItem('guest_location',this.guest_location['zipcode'])
                //console.warn(this.locations)
                let title = location.zipcode + ' ' + location.name + ' '+ location.region;
                let services_list = "";
                for(let i = 0; i < services.length; i++) {
                    services_list += '<li class="fs-6">'+services[i].name+'</li>';
                }

                return '<div>\
                    <h5 id="location_name">'+title+'</h5>\
                    <ul>'+services_list+'</ul>\
                    <a href="#/signup" class="btn btn-primary btn-sm">Sign up</a>\
                    </div>';
            } catch (error) {
                console.error(error);
            }
        },

        closeInfoWindow() {
            if(this.map.infowindow) {
                this.map.infowindow.close();
                this.map.infowindow = null;
            }
        },

        checkMapInViewport() {
            let box = this.$refs.mapWrapper.getBoundingClientRect();
            return (
                box.bottom > 0 &&
                (box.top + 100) <= (window.innerHeight || document.documentElement.clientHeight)
            );
        },

        submit() {
            this.$refs.ts.showDropdownList();
        },

        showServicesAtLocation(id) {
            this.noService.msg = false;
            this.noService.location = null;
            this.closeInfoWindow();
            let marker = this.map.markers[id];
            if (marker) {
                this.openInfoWindow(marker);
            } else if(id) {
                this.noService.location = _.find(this.locations_all, {id: parseInt(id)});
                this.noService.msg = true;
            }
        }
    }
})
</script>

<style scoped>
  #mapWrapper {
    height: 400px;
    width: 100%;
  }
</style>
