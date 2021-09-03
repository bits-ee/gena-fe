import _ from 'lodash'
import '@/types/ProfileState'
import '@/types/PersonalDetails'
import '@/types/Channels'
import '@/types/UserLocation'
export default {
    setAvatar(state: ProfileState, avatar: string) {   
      if (avatar != null) {
        avatar = avatar.includes('?') ? avatar.split('?')[0] : avatar
        avatar += '?' + new Date().getTime()
      }
      state.avatar = avatar
    },
    deleteAvatar(state: ProfileState) {
      state.avatar = null
    },
    setPersonalDetails(state: ProfileState, personal_details: PersonalDetails) {
      state.personal_details = personal_details
    },
    setChannels(state: ProfileState, channels: Channels) {
      state.channels = channels
    },
    deleteEmailChannel(state: ProfileState) {
      state.channels.email = null
    },
    deleteTgChannel(state: ProfileState) {
      state.channels.tg = null
    },
    setEmailChannel(state: ProfileState, email: string) {
      state.channels.email = email
    },
    setTgChannel(state: ProfileState, tg: string) {
      state.channels.tg = tg
    },
    updateLocation(state: ProfileState, location: UserLocation){
      _.merge(_.find(state.user_locations, {id: location.id}), location)
    },
    addLocation(state: ProfileState, location: UserLocation){
      state.user_locations.push(location)
    },
    deleteLocation(state: ProfileState, location: UserLocation){
      _.remove(state.user_locations, {id: location.id})
    },
    setLocations(state: ProfileState, locations: UserLocation[]){
      state.user_locations = locations
    },
    clear(state: ProfileState){
      state = {
        avatar: null,
        channels: {
          tg: "",
          email: ""
        },
        personal_details:{
          firstname: "",
          lastname: "",
          language: ""
        },
        user_locations: [] as UserLocation[]
      }
    }
}