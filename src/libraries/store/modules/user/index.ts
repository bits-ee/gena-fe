import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import '@/types/UserState'

export default {
  namespaced: true,
  state: <UserState>{
    is_auth: false
  },
  getters,
  mutations,
  actions
}
