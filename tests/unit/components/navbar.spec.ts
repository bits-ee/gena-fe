import navbar from '@/components/navbar.vue'

describe("NavbarComponent", ()=>{
    
    test("Show navbar logo", ()=>{
        
    })

    test("Show login and signup links if user isn't authorized", ()=>{
        
    })

    test("Show avatar(profile link) and logout button if user is authorized", ()=>{
        
    })

    test("Show language switcher", ()=>{
        
    })

    test("Switch languages", ()=>{
        
    })

    test("Check logo link route", ()=>{

    })

    test("Check login/signup links route to signup page", ()=>{

    })

    test("Check logout button", ()=>{

    })

    test("Check avatar link routes to profile", ()=>{

    })
})

//VUEX DATA
// boolean 'is_auth'

// MOUNT
//1. show logo component; redirect to index on click
//2. show select-language component; access to change 'i18n' language
//3. show login component
    //3.1 if 'is_auth' is false, show 'log in' and 'register' buttons redirecting to 'signup' component on click
    //3.2 if 'is_auth' is true
        //3.2.1 show 'log out' button, logout on click
        //3.2.2 show 'profile' button redirecting to 'profile' on click; 
        //      if screen width>768px show 'profile' button as user's avatar;
        //      if avatar does not exist, show default avatar "@/assets/images/profile/avatar_default.jpg";