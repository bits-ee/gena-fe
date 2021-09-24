import profile from '@/views/profile.vue'

describe("ProfileView", ()=>{
    test("Fetch profile data if user is authorized, then show all profile components", ()=>{
        
    })

    test("Redirect to signup if user isn't authorized", ()=>{
        
    })
})

// VUEX DATA
// boolean 'is_auth'

// MOUNT
//1. if 'is_auth' is true call actions 'FETCH_LOCATIONS',
//              'FETCH_AVATAR',
//              'FETCH_DETAILS',
//              'FETCH_CHANNELS',
//              'FETCH_USER_LOCATIONS',
// actions. If all was success, set 'init' param to true and load components
//2. else redirect to signup
