
export default {
    avatar: (state: ProfileState): string => {
      return state.avatar
    },
    personal_details: (state: ProfileState): PersonalDetails => {
      return state.personal_details
    },
    channels: (state: ProfileState): Channels => {
      return state.channels
    },
    user_locations: (state: ProfileState): UserLocation[] => {
      return state.user_locations
    }
}