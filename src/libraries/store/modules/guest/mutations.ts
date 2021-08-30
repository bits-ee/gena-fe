export default {
    findLoc(state: CurrentLocationState, coords: number[]){
        state.lat = coords[0]
        state.lng = coords[1]
    }
}