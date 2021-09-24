import signup from '@/views/signup.vue'

describe("ProfileView", ()=>{
    test("Show login components if user isn't authorized", ()=>{
        
    })

    test("Show 'go to profile' button if user is authorized", ()=>{
        
    })
})

// VUEX DATA
//boolean 'is_auth'

// MOUNT
//1. if 'is_auth' is false, show 'emailLogin' and 'tgLogin' components
//2. else show 'go to profile' button redirecting to 'profile' on click 
