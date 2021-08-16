export default {
    login(state: UserState, key: string) {
      state.session_key = key
      sessionStorage.setItem("sessionKey", key)
      axios.defaults.headers.common.Authorization = 'Bearer '+sessionStorage.getItem('sessionKey')  
      state.is_auth = true
    },
    logout(state: UserState) {
      state.session_key = {} as string
      sessionStorage.removeItem("sessionKey")
      state.is_auth = false
    }
}