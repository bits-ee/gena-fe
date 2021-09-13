import '@/types/StaticState'
import '@/types/Location'
import '@/types/CalendarEvent'
export default {
    locations: (state: StaticState): Location[] => {
        return state.locations
    },
    locations_all: (state: StaticState): Location[] => {
        return state.locations_all
    },
    guest_location: (state: StaticState): GuestLocation=> {
        return state.guest_location
    },
    calendar: (state: StaticState): CalendarEvent[]=> {
        return state.calendar
    }
}