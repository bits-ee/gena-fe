import '@/types/StaticState'
import '@/types/Location'
export default {
    locations: (state: StaticState): Location[] => {
        return state.locations
    },
    locations_all: (state: StaticState): Location[] => {
        return state.locations_all
    }, 
}