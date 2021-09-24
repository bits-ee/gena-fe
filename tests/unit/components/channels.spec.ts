import channels from '@/components/channels.vue'
import emailLogin from '@/components/emailLogin.vue'
import tgChannel from '@/components/tgChannel.vue'

describe("ChannelsComponent", ()=>{

    test("Show email channel", ()=>{
        
    })

    test("Show telegram channel", ()=>{
        
    })

    test("Show email disconnect/can't disconnect button", ()=>{
        
    })

    test("Show telegram disconnect/can't disconnect button", ()=>{
        
    })

    test("Delete email channel", ()=>{
        
    })

    test("Delete telegram channel", ()=>{
        
    })
})


//VUEX DATA
// Channels 'channels'

// MOUNT
//1. if 'channels.email' exist, show 'channels.email'; else show 'emailLogin' component with property 'channel = true'
//2. if 'channels.tg' exist, show 'channels.tg'; else show 'tgChannel' component
//3. if more then 1 channels are connected, show the 'DISCONNECT' button; else show 'CANNOT DISCONNECT CHANNEL' message

// DELETE
//1. on click on the 'DISCONNECT EMAIL' button calls 'DELETE_EMAIL_CHANNEL' action
//2. on click on the 'DISCONNECT TELEGRAM' button calls 'DELETE_TG_CHANNEL' action

//ADDING THE CHANNELS
//1. channels adding tests in the 'emailLogin' and 'tgChannel' components
