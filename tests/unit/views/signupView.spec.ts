import { shallowMount } from '@vue/test-utils'
import signup from '@/views/signup.vue'
import store from '@/libraries/store'
import emailLogin from '@/components/emailLogin.vue'
import tgLogin from '@/components/tgLogin.vue'
import router from '@/libraries/router'
import '@/libraries/axios'
store.dispatch = jest.fn(() => Promise.resolve())
store.commit("user/login", "mock_key")
let wrapper = shallowMount(signup, {
  global: {
    plugins: [store, router],
    mocks: {
      $t: jest.fn()
    }
  }
})
describe("SignupView", ()=>{
    test("Show login components if user isn't authorized", async ()=>{
        wrapper.vm.$store.commit("user/logout")
        await wrapper.vm.$nextTick()
        expect(wrapper.findComponent(emailLogin).exists()).toBe(true)
        expect(wrapper.findComponent(tgLogin).exists()).toBe(true)
    })

    test("Show 'go to profile' button if user is authorized", async ()=>{
    })
})

// VUEX DATA
//boolean 'is_auth'

// MOUNT
//1. if 'is_auth' is false, show 'emailLogin' and 'tgLogin' components
//2. else show 'go to profile' button redirecting to 'profile' on click 
