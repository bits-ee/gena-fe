
export default {
    avatar: (state: ProfileState): string | null => {
      return state.avatar
    },
    avatar_url: (state: ProfileState): string => {
      let avatar = ""
      if(state.avatar){
          if(!state.avatar.includes('http')){
              avatar = process.env.VUE_APP_DATA_SERVICE_URL + state.avatar
          }
          else{
              avatar = state.avatar
          }
      }
      else{
          avatar = process.env.VUE_APP_DATA_SERVICE_URL + "storage/app/avatars/default_avatar.jpg"
      }
      return avatar
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