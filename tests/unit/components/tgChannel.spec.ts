import { shallowMount } from '@vue/test-utils'
import tgChannel from '@/components/tgChannel.vue'
import store from '@/libraries/store'
import '@/libraries/axios'
store.dispatch = jest.fn(() => Promise.resolve())
let wrapper = shallowMount(tgChannel, {
    attachTo: document.body,
    global: {
        plugins: [store],
        mocks: {
            $t: jest.fn(),
            $i18n: {
                locale:"en"
            }
        }
    }
});

describe("TgChannelComponent", ()=>{
    test("Show telegarm widget", async()=>{
        expect(wrapper.vm.script.src).toBe("https://telegram.org/js/telegram-widget.js?14")
        expect(wrapper.vm.script["data-telegram-login"]).toBe(wrapper.vm.$store.getters["config/tgBotName"])
        expect(document.body.contains(wrapper.vm.script)).toBe(true)
    })

    test("Verify telegram channel", ()=>{
        expect(wrapper.vm.script.getAttribute("data-onauth")).toEqual("onTelegramAuth(user)");
        wrapper.vm.VERIFY_TG_CHANNEL()
        //@ts-ignore
        expect(store.dispatch.mock.calls[0][0]).toEqual("profile/VERIFY_TG_CHANNEL")
    })
    
})

//VUEX DATA
// 'tgBotName'

// MOUNT
//1. load telegram widget using script
    //<src> = 'https://telegram.org/js/telegram-widget.js?14'
    //<data-telegram-login> = 'tgBotName'
//2. on widget click call 'VERIFY_TG_CHANNEL' action with telegram 'user' as payload