import app from '@/App.vue'

describe("ProfileView", ()=>{
    test("Check if user is authorized", ()=>{
        
    })

    test("Fetch configs", ()=>{
        
    })
})

// MOUNT
//1. if sessionStorage['sessionKey'] is exist, call 'FETCH_AVATAR' action
    //1.1. if success, call 'login' mutation with sessionStorage['sessionKey'] as payload
    //1.2. else call 'logout' mutation
//2. call 'FETCH_CONFIG' action
    //2.1. if success, set 'init' to true and load a page
    //2.2. else show error
