export default {
    LOGIN_EMAIL(context: any, secretKey: string) {
      axios
        .get("/auth/email/verify/" + secretKey)
        .then((response: any) => {
          context.commit("setKey", response.data.sessionkey)
        })
    },
    LOGIN_TG(context: any, user: any) {
      axios
        .post("/auth/tg/verify", { auth_data: user })
        .then((response: any) => {
          context.commit("setKey", response.data.sessionkey)
        })
    },
    LOGOUT(context: any) {
      context.commit("logout")
    }
}