import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import '@/types/ProfileState'
export default {
  namespaced: true,
  state: <ProfileState>{
    avatar: null,
    channels: {
      email: null,
      tg: null
    },
    personal_details:{
      firstname: "",
      lastname: "",
      language: ""
    },
    user_locations: []
  },
  getters,
  mutations,
  actions
}
