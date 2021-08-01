export default {
    getGoogleRecaptchaKey: (state: ConfigState): string => {
      return state.googleRecaptchaSiteKey
    },
    getGoogleMapKey: (state: ConfigState): string => {
      return state.googleMapKey
    },
    getTgBotName: (state: ConfigState): string => {
      return state.tgBotName
    },
    getAppRoot: (state: ConfigState): string => {
      return state.appRoot
    },
    getLocationRequestForm: (state: ConfigState): string => {
      return state.locationRequestForm
    }
}