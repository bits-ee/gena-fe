export default {
    findLoc(state: CurrLocationState, coords: number[]){
        state.lat = coords[0]
        state.lng = coords[1]
    }
}