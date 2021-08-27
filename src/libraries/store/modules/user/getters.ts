import '@/types/UserState'

export default {
    is_auth: (state: UserState): Boolean => {
      return state.is_auth
    }
}