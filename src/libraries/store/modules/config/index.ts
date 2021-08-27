import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import '@/types/ConfigState'

export default {
  namespaced: true,
  state: <ConfigState>{},
  getters,
  mutations,
  actions
}
