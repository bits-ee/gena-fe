import '@/types/StaticState'
import '@/types/Location'
export default {
    setLocations(state: StaticState, locations: Location[]){
        state.locations = locations
    },
    setAllLocations(state: StaticState, locations_all: Location[]){
        state.locations_all = locations_all
    }
}