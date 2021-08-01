export default {
    setKey(state: UserState, key: string) {
      state.session_key = key
      sessionStorage.setItem("sessionKey", key)
      state.is_auth = true
    },
    logout(state: UserState) {
      state.session_key = <string>{}
      sessionStorage.removeItem("sessionKey")
      state.is_auth = false
    }
}