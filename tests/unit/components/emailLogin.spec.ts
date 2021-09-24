import emailLogin from '@/components/emailLogin.vue'

describe("EmailLoginComponent", ()=>{
    test("Initialize ReCaptcha, show 'INPUT' state by default", ()=>{
        
    })

    test("Show error if email don't match regex", ()=>{
        
    })

    test("Submit email", ()=>{

    })

    test("Verify email", ()=>{
        
    })
})

// VUEX DATA
// string 'googleRecaptchaKey'

// PROPS
//1. is_channel: boolean, false by default

// MOUNT
//1. initialize reCaptcha
//2. show 'INPUT' state

// INPUT
//1. show input field and submit button
//2 on submit check if the value matching to 'email regex';
    //2.1 if it's not matching 'email regex' shows error
    //2.2 else set 'WAIT' state, then execute grecaptcha with 'googleRecaptchaKey' using the action:
        //2.2.1 'ADD_EMAIL_CHANNEL' if 'is_channel' prop is true
        //2.2.2 'REG_EMAIL' if 'is_channel' prop is false
    //2.3 if api call was success, set 'VERIFY' state; else set 'ERROR' state

// VERIFY
//1. show input field, submit button and back button
//2. on submit set 'WAIT' state, then send input data by the api call:
    //2.1 'VERIFY_EMAIL' if 'is_channel' is true
        //2.1.1 if call was success redirect to profile; else set 'ERROR' state
    //2.2 'VERIFY_EMAIL_CHANNEL' if 'is_channel' is false
//3. on back button click set 'INPUT' state


