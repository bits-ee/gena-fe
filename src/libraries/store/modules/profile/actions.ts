import _ from 'lodash'
export default {
  FETCH_AVATAR(context: any) {
    return new Promise((resolve, reject)=>{
      axios({
        method: "get",
        url: "/profile/avatar",
      })
      .then((response: any)=>{
        context.commit("setAvatar", response.data.image)
        resolve(response)
      })
      .catch((err: any)=>{
        reject(err)
      })
    })
  },
  UPDATE_AVATAR(context: any, file: File) {
    let form_data = new FormData()
    form_data.append('file', file)
    return new Promise((resolve, reject)=>{
      axios({
        method: "post",
        url: "/profile/avatar",
        data: form_data,
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(async (response: any)=>{
        await context.dispatch("FETCH_AVATAR")
        context.commit("notification/notify", response.data.message, { root: true })        
        resolve(response)
      })
      .catch((err: any)=>{       
        context.commit("notification/notifyError", err.response.data.error, { root: true })
        reject(err)
      })
    })
  },
  DELETE_AVATAR(context: any) {
    return new Promise((resolve, reject)=>{
      axios({
        method: "delete",
        url: "/profile/avatar",
      })
      .then((response: any)=>{
        context.commit("deleteAvatar")
        context.commit("notification/notify", response.data.message, { root: true })
        resolve(response)
      })
      .catch((err: any)=>{
        context.commit("notification/notifyError", err.response.data.error, { root: true })
        reject(err)
      })
    })
  },
  UPDATE_DETAILS(context: any, personal_details: PersonalDetails) {
    return new Promise((resolve, reject)=>{
      axios({
        method: "post",
        url: "/profile/personalDetails",
        data: personal_details,
      })
      .then((response: any)=>{
        context.commit("setPersonalDetails", personal_details)
        context.commit("notification/notify", response.data.message, { root: true })
        resolve(response)
      })
      .catch(async (err: any)=>{
        await context.dispatch('FETCH_DETAILS')
        context.commit("notification/notifyError", err.response.data.error, { root: true })
        reject(err)
      })
    })
  },
  FETCH_DETAILS(context: any) {
    return new Promise((resolve, reject)=>{
      axios({
        method: "get",
        url: "/profile/personalDetails",
      })
      .then((response: any)=>{
        let personal_details = <PersonalDetails>{
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          language: response.data.language,
        }
        context.commit("setPersonalDetails", personal_details)
        resolve(response)
      })
      .catch((err: any)=>{
        reject(err)
      })
    })
  },
  FETCH_CHANNELS(context: any) {
    return new Promise((resolve, reject)=>{
      axios({
        method: "get",
        url: "/profile/channels",
      })
      .then((response: any)=>{
        let channels = <Channels>{
          tg: response.data.tg,
          email: response.data.email,
        }
        context.commit("setChannels", channels)
        resolve(response)
      })
      .catch((err: any)=>{
        reject(err)
      })
    })
  },
  DELETE_EMAIL_CHANNEL(context: any) {
    return new Promise((resolve, reject)=>{
      axios({
        method: "delete",
        url: "/profile/channels/email/delete",
      })
      .then(async (response: any)=>{
        context.commit('deleteEmailChannel')
        context.commit("notification/notify", response.data.message, { root: true })
        resolve(response)
      })
      .catch((err: any)=>{
        context.commit("notification/notifyError", err.response.data.error, { root: true })
        reject(err)
      })
    })
  },
  DELETE_TG_CHANNEL(context: any) {
    return new Promise((resolve, reject)=>{
      axios({
        method: "delete",
        url: "/profile/channels/tg/delete",
      })
      .then(async (response: any)=>{
        context.commit('deleteTgChannel')
        context.commit("notification/notify", response.data.message, { root: true })
        resolve(response)
      })
      .catch((err: any)=>{
        context.commit("notification/notifyError", err.response.data.error, { root: true })
        reject(err)
      })
    })
  },
  ADD_EMAIL_CHANNEL(context: any, email: string) {
    return new Promise((resolve, reject)=>{
      axios({
        method: "post",
        url: "/profile/channels/email",
        data: {
          email: email
        }
      })
      .then((response: any)=>{
        context.commit("notification/notify", response.data.message, { root: true })
        resolve(response)
      })
      .catch((err: any)=>{
        context.commit("notification/notifyError", err.response.data.error, { root: true })
        reject(err)
      })
    })
  },
  VERIFY_EMAIL_CHANNEL(context: any, key: string) {
    return new Promise((resolve, reject)=>{
      axios({
        method: "post",
        url: "/profile/channels/email/verify/"+key
      })
      .then(async (response: any)=>{
        await context.dispatch("FETCH_CHANNELS")
        context.commit("notification/notify", response.data.message, { root: true })
        resolve(response)
      })
      .catch((err: any)=>{
        context.commit("notification/notifyError", err.response.data.error, { root: true })
        reject(err)
      })
    })
  },
  VERIFY_TG_CHANNEL(context: any, user: any) {
    return new Promise((resolve, reject)=>{
      axios({
        method: "post",
        url: "/profile/channels/tg/verify",
        data: { auth_data: user }
      })
      .then(async (response: any)=>{
        context.commit('setTgChannel', user.username)
        context.commit("notification/notify", response.data.message, { root: true })
        resolve(response)
      })
      .catch((err: any)=>{
        context.commit("notification/notifyError", err.response.data.error, { root: true })
        reject(err)
      })
    })
  },
  FETCH_USER_LOCATIONS(context: any) {
    return new Promise((resolve, reject)=>{
      axios({
        method: "get",
        url: "/profile/userLocations",
      })
      .then(async (response: any)=>{
        context.commit("setLocations", response.data)
        await Promise.all(context.getters.user_locations.forEach((location: UserLocation) => {
          context.dispatch('FETCH_LOCATION_SERVICES', location)
        }));
        resolve(response)
      })
      .catch((err: any)=>{
        reject(err)
      })
    })
  },
  UPDATE_USER_LOCATION(context: any, location: UserLocation){
    return new Promise((resolve, reject)=>{
      axios({
        method: "patch",
        url: "/profile/userLocations",
        data: location,
      })
      .then(async (response: any)=>{
        await context.dispatch('UPDATE_LOCATION_SERVICES', location),
        context.commit('updateLocation', location)
        context.commit("notification/notify", response.data.message, { root: true })
        resolve(response)
      })
      .catch(async (err: any)=>{
        await Promise.allSettled([
          //if in UPDATE_USER_LOCATION location has no changed(location name, street name or street number) error will raized. It's laravel 'update' method problem
          context.dispatch('UPDATE_LOCATION_SERVICES', location),
          context.dispatch('FETCH_USER_LOCATIONS', location)
        ])
        context.commit("notification/notifyError", err.response.data.error, { root: true })
        reject(err)
      })
    })
  },
  DELETE_USER_LOCATION(context: any, location: UserLocation){
    return new Promise((resolve, reject)=>{
      axios({
        method: "delete",
        url: "/profile/userLocations",
        data: {
          id: location.id,
        },
      })
      .then(async (response: any)=>{
        _.remove(context.getters['user_locations'], location)
        context.commit("notification/notify", response.data.message, { root: true })
        resolve(response)
      })
      .catch((err: any)=>{
        context.commit("notification/notifyError", err.response.data.error, { root: true })
        reject(err)
      })
    })
  },
  ADD_USER_LOCATION(context: any, location: UserLocation){
    return new Promise((resolve, reject)=>{
      axios({
        method: "post",
        url: "/profile/userLocations",
        data: location,
      })
      .then(async (response: any)=>{
        location.id = response.data.id
        await Promise.allSettled([
          context.dispatch('UPDATE_LOCATION_SERVICES', location),
          context.dispatch('FETCH_USER_LOCATIONS', location)
        ])  
        context.commit("notification/notify", response.data.message, { root: true })
        resolve(response)
      })
      .catch((err: any)=>{
        context.commit("notification/notifyError", err.response.data.error, { root: true })
        reject(err)
      })
    })  
  },
  FETCH_LOCATION_SERVICES(context: any, location: UserLocation) {
    return new Promise((resolve, reject)=>{
      axios({
        method: "get",
        url: "/locations/services/" + location.location_id + "/" + location.id,
      })
      .then((response: any)=>{
        location.services = response.data.results;
        resolve(response)
      })
      .catch((err: any)=>{
        reject(err)
      })
    })
  },
  UPDATE_LOCATION_SERVICES(context: any, location: UserLocation){
    return new Promise((resolve, reject)=>{
      axios({
        method: "patch",
        url: "/profile/services",
        data: {
          services: location.services,
          user_location_id: location.id,
        }
      })
      .then((response: any)=>{
        resolve(response)
      })
      .catch((err: any)=>{
        reject(err)
      })
    })
  },
  DELETE_LOCATION_SERVICES(context: any, location: UserLocation){
    return new Promise((resolve, reject)=>{
      axios({
        method: "delete",
        url: "/profile/services",
        data: {
          user_location_id: location.id,
        }
      })
      .then((response: any)=>{
        resolve(response)
      })
      .catch((err: any)=>{
        reject(err)
      })
    })
  }
}