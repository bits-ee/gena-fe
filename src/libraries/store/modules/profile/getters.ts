
import '@/types/PersonalDetails'
import '@/types/Channels'
import '@/types/UserLocation'
export default {
    avatar: (state: ProfileState): string | null => {
      return state.avatar
    },
    avatar_url: (state: ProfileState): string | null => {
      let url = null
      if(state.avatar){
          if(!state.avatar.includes('http')){
            url = process.env.VUE_APP_DATA_SERVICE_URL + state.avatar
          }
          else{
            url = state.avatar
          }
      }
      return url
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