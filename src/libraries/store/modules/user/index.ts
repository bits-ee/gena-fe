import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default {
  namespaced: true,
  state: <UserState>{
    is_auth: false
  },
  getters,
  mutations,
  actions
}
