import '@/types/StaticState'
import '@/types/Location'
import '@/types/CalendarEvent'
export default {
    setLocations(state: StaticState, locations: Location[]){
        state.locations = locations
    },
    setAllLocations(state: StaticState, locations_all: Location[]){
        state.locations_all = locations_all
    },
    setGuestLocation(state: StaticState, guest_location: GuestLocation){
        state.guest_location = guest_location
    },
    setCalendar(state: StaticState, calendar: CalendarEvent[]){
        state.calendar = calendar
    }
}