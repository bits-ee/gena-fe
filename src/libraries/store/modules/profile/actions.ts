export default {
    FETCH_AVATAR(context: any) {
      axios({
        method: "get",
        url: "/profile/avatar",
      }).then((response: any) => {
        let avatar = response.data.image
        if (avatar != null) {
          let delimiter = ""
          delimiter = avatar.includes("?") ? "&" : "?"
          avatar += delimiter + new Date().getTime()
        }
        context.commit("setAvatar", avatar)
      })
    },
    UPDATE_AVATAR(context: any, form_data: FormData) {
      axios({
        method: "post",
        url: "/profile/avatar",
        data: form_data,
        headers: {
          "content-type": "multipart/form-data",
        },
      }).then(() => {
        context.dispatch("FETCH_AVATAR")
      })
    },
    DELETE_AVATAR(context: any) {
      axios({
        method: "delete",
        url: "/profile/avatar",
      }).then(() => {
        context.commit("deleteAvatar")
      })
    },
    UPDATE_DETAILS(context: any, personal_details: PersonalDetails) {
      let personal_details_old = context.getters.personal_details
      axios({
        method: "post",
        url: "/profile/personalDetails",
        data: personal_details,
      })
        .then((response: any) => {
          context.commit("setPersonalDetails", personal_details)
        })
        .catch((err: any) => {
          context.commit("setPersonalDetails", personal_details_old)
        })
    },
    FETCH_DETAILS(context: any) {
      axios({
        method: "get",
        url: "/profile/personalDetails",
      }).then((response: any) => {
        let personal_details = <PersonalDetails>{
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          language: response.data.language,
        }
        context.commit("setPersonalDetails", personal_details)
      })
    },
    FETCH_CHANNELS(context: any) {
      axios.get("/profile/channels").then((response: any) => {
        let channels = <Channels>{
          tg: response.data.tg,
          email: response.data.email,
        }
        context.commit("setChannels", channels)
      })
    },
    DELETE_EMAIL_CHANNEL(context: any) {
      axios({
        method: "delete",
        url: "/profile/channels/email/delete",
      }).then(() => {
        context.dispatch("FETCH_CHANNELS")
      })
    },
    DELETE_TG_CHANNEL(context: any) {
      axios({
        method: "delete",
        url: "/profile/channels/tg/delete",
      }).then(() => {
        context.dispatch("FETCH_CHANNELS")
      })
    },
    VERIFY_TG_CHANNEL(context: any, user: any) {
      axios
        .post("/profile/channels/tg/verify", { auth_data: user })
        .then(() => {
          context.dispatch("FETCH_CHANNELS")
        })
    },
    FETCH_LOCATIONS(context: any) {
      axios({
        method: "get",
        url: "/profile/userLocations",
      })
      .then((response: any) => {
        context.commit("setLocations", response.data)
        response.data.forEach((location: UserLocation) => { 
          context.dispatch('FETCH_LOCATIONS_SERVICES', location)
        });
      })
    },
    UPDATE_LOCATION(context: any, location: UserLocation){
      axios({
        method: "patch",
        url: "/profile/userLocations",
        data: location,
      }).then(()=>{
        context.dispatch('UPDATE_LOCATION_SERVICES', location)
        context.dispatch('FETCH_LOCATIONS', location)
      })
    },
    DELETE_LOCATION(context: any, location: UserLocation){
      if(location.services){
        context.dispatch('DELETE_LOCATION_SERVICES', location)
      }
      axios({
        method: "delete",
        url: "/profile/userLocations",
        data: {
          id: location.id,
        },
      })
      .then(()=>{
        context.dispatch('FETCH_LOCATIONS', location)
      })
    },
    ADD_LOCATION(context: any, location: UserLocation){
      axios({
        method: "post",
        url: "/profile/userLocations",
        data: location,
      })
      .then(()=>{
        context.dispatch('UPDATE_LOCATION_SERVICES', location)
        context.dispatch('FETCH_LOCATIONS', location)
      })
    },
    FETCH_LOCATIONS_SERVICES(context: any, location: UserLocation) {
      axios({
        method: "get",
        url: "/locations/services/" + location.location_id + "/" + location.id,
      })
      .then((response: any) => {
        location.services = response.data.results;
      })
    },
    UPDATE_LOCATION_SERVICES(context: any, location: UserLocation){
      axios({
        method: "patch",
        url: "/profile/services",
        data: {
          services: location.services,
          user_location_id: location.id,
        },
      });
    },
    DELETE_LOCATION_SERVICES(context: any, location: UserLocation){
      axios({
        method: "delete",
        url: "/profile/services",
        data: {
          user_location_id: location.id,
        },
      });
    }
}