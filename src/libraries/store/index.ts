import profile from "./modules/profile"
import statics from "./modules/statics"
import user from "./modules/user"
import config from "./modules/config"
import { createStore } from "vuex"

export default createStore({
  modules: {
    profile,
    statics,
    user,
    config
  },
})
