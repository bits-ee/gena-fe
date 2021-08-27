import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import '@/types/NotificationState'

export default {
  namespaced: true,
  state: <NotificationState>{
    show: false
  },
  getters,
  mutations,
  actions
}
