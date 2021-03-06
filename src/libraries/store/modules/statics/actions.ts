import '@/types/Location'
import '@/types/GuestLocation'
export default {
    FETCH_LOCATIONS(context: any){
        return new Promise((resolve, reject)=>{
            axios({
                method: "get",
                url: "/locations",
            })
            .then((response: any)=>{
                let locations = <Location[]>response.data
                context.commit('setLocations', locations)
                resolve(response)
            })
            .catch((err: any)=>{
                reject(err)
            })
        })
    },
    FETCH_ALL_LOCATIONS(context: any){
        return new Promise((resolve, reject)=>{
            axios({
                method: "get",
                url: "/locations/all",
            })
            .then((response: any)=>{
                let locations = <Location[]>response.data
                context.commit('setAllLocations', locations)
                resolve(response)
            })
            .catch((err: any)=>{
                reject(err)
            })
        })
    },
    FETCH_SERVICES(context: any, zipcode: number){
        return new Promise((resolve, reject)=>{
            axios({
                method: "get",
                url: "/locations/"+zipcode+"/services",
            })
            .then((response: any)=>{
                let guest_location = <GuestLocation> response.data.location
                context.commit('setGuestLocation', guest_location)
                resolve(response)
            })
            .catch((err: any)=>{
                reject(err)
            })
        })
    }
}