import '@/types/NotificationState'

export default {
    notify(state: NotificationState, message?: string) {
      state.show = true
      state.is_error = false
      state.message = message??'Action success'
    },
    notifyError(state: NotificationState, message?: string){
      state.show = true
      state.is_error = true
      state.message = message??'Some error occued'
    },
    hide(state: NotificationState){
      state.show = false
    }
}