import notification from '@/components/notification.vue'

describe("NotificationComponent", ()=>{
    test("Show notification", ()=>{
        
    })

    test("Notification auto-hiding", ()=>{
        
    })

    test("Notification updating", ()=>{

    })

    test("Close notification", ()=>{

    })
})

//VUEX DATA
// boolean 'is_error'
// boolean 'show'
// string 'message'
// number 'time'


// 'is_error'
//1. if 'is_error' is false, add class 'alert-success' and remove class 'alert-danger'
//2. if 'is_error' is true, add class 'alert-danger' and remove class 'alert-success'


// 'show'
//1. if 'show' is false, add class 'd-none' and remove class 'show'
//2. if 'show' is true, add class 'show' and remove class 'd-none'
//3. show notification with 'message' param
//4. show 'close' button, call 'clear' mutation on click

// MOUNT
//1. 3,2 seconds after notification had shown, call 'clear' mutation
//2. on route change call 'clear' mutation
