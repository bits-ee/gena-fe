export default {
    GET_KEYS(commit: any) {
      axios.get("/keys").then((response: any) => {
        let keys = <ConfigState>{
          googleRecaptchaSiteKey: response.data.googleRecaptchaSiteKey,
          googleMapKey: response.data.googleMapKey,
          tgBotName: response.data.tgBotName,
          appRoot: response.data.appRoot,
          locationRequestForm: response.data.locationRequestForm,
        }
        commit.commit("setKeys", keys)
      })
    }
}