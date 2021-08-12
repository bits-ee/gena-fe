
export default {
    message: (state: NotificationState): String => {
      return state.message
    },
    is_error: (state: NotificationState): boolean => {
      return state.is_error
    },
    show: (state: NotificationState): boolean => {
      return state.show
    }
}