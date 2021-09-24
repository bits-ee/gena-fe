import tgLogin from '@/components/tgLogin.vue'

describe("TgLoginComponent", ()=>{
    test("Show telegarm widget", ()=>{
        
    })

    test("Login by telegram", ()=>{
        
    })
    
})

//VUEX DATA
// 'tgBotName'

// MOUNT
//1. load telegram widget using script
    //<src> = 'https://telegram.org/js/telegram-widget.js?14'
    //<data-telegram-login> = 'tgBotName'
//2. on widget click call 'LOGIN_TG' action with telegram 'user' as payload


// LOGIN
// if success, redirect to 'profile'
// if failed shows error message