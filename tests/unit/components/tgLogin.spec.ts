import { shallowMount } from '@vue/test-utils'
import tgLogin from '@/components/tgLogin.vue'
import store from '@/libraries/store'
import router from '@/libraries/router';

store.dispatch = jest.fn(() => Promise.resolve())
let wrapper = shallowMount(tgLogin, {
    attachTo: document.body,
    global: {
        plugins: [store, router],
        mocks: {
            $t: jest.fn(),
            $i18n: {
                locale:"en"
            }
        }
    }
});

describe("TgLoginComponent", ()=>{
    test("Show telegarm widget", ()=>{
        expect(wrapper.vm.script.src).toBe("https://telegram.org/js/telegram-widget.js?14")
        expect(wrapper.vm.script["data-telegram-login"]).toBe(wrapper.vm.$store.getters["config/tgBotName"])
        expect(document.body.contains(wrapper.vm.script)).toBe(true)
    })

    test("Login by telegram", ()=>{
        expect(wrapper.vm.script.getAttribute("data-onauth")).toEqual("onTelegramAuth(user)");
        wrapper.vm.LOGIN_TG()
        //@ts-ignore
        expect(store.dispatch.mock.calls[0][0]).toEqual("user/LOGIN_TG")
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