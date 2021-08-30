import profile from "./modules/profile"
import statics from "./modules/statics"
import user from "./modules/user"
import config from "./modules/config"
import guest from "./modules/guest"
import notification from "./modules/notification"
import { createStore } from "vuex"

//TODO: update function in lumen return false if data doesn't change. It leads to incorrect frontend work
export default createStore({
  modules: {
    profile,
    statics,
    user,
    guest,
    config,
    notification
  },
})
