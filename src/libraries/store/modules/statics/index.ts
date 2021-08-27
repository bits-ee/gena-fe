import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import '@/types/StaticState'

export default {
  namespaced: true,
  state: <StaticState>{},
  getters,
  mutations,
  actions
}
