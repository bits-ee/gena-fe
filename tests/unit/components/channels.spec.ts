import channels from '@/components/channels.vue'
import emailLogin from '@/components/emailLogin.vue'
import tgChannel from '@/components/tgChannel.vue'

describe("ChannelsComponent", ()=>{

    test("Show email if channel connected", ()=>{
        
    })

    test("Show telegram username if channel connected", ()=>{
        
    })

    test("Show 'emailLogin' component if email channel not connected", ()=>{
        
    })

    test("Show 'tgChannel' component if telegram channel not connected", ()=>{
        
    })

    test("Show email 'disconnect' button if more then 1 channel connected", ()=>{
        
    })

    test("Show telegram 'disconnect' button if more then 1 channel connected", ()=>{
        
    })

    test("Show email 'can't disconnect button' if the only 1 channel connected", ()=>{
        
    })

    test("Show telegram 'can't disconnect button' if the only 1 channel connected", ()=>{
        
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
