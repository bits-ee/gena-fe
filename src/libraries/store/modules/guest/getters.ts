export default {
    lat: (state: CurrentLocationState): Number => {
        return state.lat
    },
    lng: (state: CurrentLocationState): Number => {
        return state.lng
    },
}