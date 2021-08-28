import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import '@/types/ProfileState'
export default {
  namespaced: true,
  state: <ProfileState>{},
  getters,
  mutations,
  actions
}
