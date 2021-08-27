import '@/types/ConfigState'
export default {
    googleRecaptchaKey: (state: ConfigState): string => {
      return state.googleRecaptchaSiteKey
    },
    googleMapKey: (state: ConfigState): string => {
      return state.googleMapKey
    },
    tgBotName: (state: ConfigState): string => {
      return state.tgBotName
    },
    appRoot: (state: ConfigState): string => {
      return state.appRoot
    },
    locationRequestForm: (state: ConfigState): string => {
      return state.locationRequestForm
    }
}