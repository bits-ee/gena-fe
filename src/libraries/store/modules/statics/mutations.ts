export default {
    setLocations(state: StaticState, locations: Location[]){
        state.locations = locations
    },
    setAllLocations(state: StaticState, locations_all: Location[]){
        state.locations_all = locations_all
    },
    setGuestLocation(state: StaticState, guest_location: GuestLocation){
        localStorage.setItem("guest_location", JSON.parse(JSON.stringify(guest_location)).location.zipcode)
        state.guest_location = guest_location
    }
}