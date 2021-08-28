import '@/types/Location'
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
                resolve(response)
            })
            .catch((err: any)=>{
                reject(err)
            })
        })
    }
}