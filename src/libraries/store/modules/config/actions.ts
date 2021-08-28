import '@/types/ConfigState'
export default {
    FETCH_CONFIG(context: any) {
      return new Promise((resolve, reject)=>{
        axios({
          method: "get",
          url: "/keys"
        })
        .then((response: any)=>{
          context.commit("init", <ConfigState>response.data)
          resolve(response)
        })
        .catch((err: any)=>{
          reject(err)
        })
      })
    }
}