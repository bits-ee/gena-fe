export default {
    setAvatar(state: ProfileState, avatar: string) {
      state.avatar = avatar
    },
    deleteAvatar(state: ProfileState) {
      state.avatar = <string>{}
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