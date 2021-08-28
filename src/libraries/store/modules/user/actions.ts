import router from '@/libraries/router'
import '@/types/RegData'
export default {
    VERIFY_EMAIL(context: any, secretKey: string) {
      return new Promise((resolve, reject)=>{
        axios({
          method: 'get',
          url: "/auth/email/verify/" + secretKey
        })
        .then((response: any)=>{
          context.commit("login", response.data.sessionkey)
          resolve(response)
        })
        .catch((err: any)=>{
          reject(err)
        })
      })
    },
    REG_EMAIL(context: any, reg_data: RegData){
      return new Promise((resolve, reject)=>{
        axios({
          method: "post",
          url: "/auth/email",
          data: reg_data
        })
        .then((response: any)=>{
          resolve(response)
        })
        .catch((err: any)=>{
          reject(err)
        })
      })
    },
    LOGIN_TG(context: any, user: any) {
      return new Promise((resolve, reject)=>{
        axios({
          method: 'post',
          url: "/auth/tg/verify",
          data: { auth_data: user }
        })
        .then((response: any)=>{
          context.commit("login", response.data.sessionkey) 
          resolve(response)
        })
        .catch((err: any)=>{
          reject(err)
        })
      })
    },
    LOGOUT(context: any) {
      context.commit("logout")
      router.push({ name: 'index'})
    }
}