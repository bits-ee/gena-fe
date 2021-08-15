import _ from "lodash"

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
    setLocations(state: ProfileState, locations: UserLocation[]){
      state.user_locations = locations
    }
}