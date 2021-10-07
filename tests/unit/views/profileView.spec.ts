import { shallowMount } from '@vue/test-utils'
import profile from '@/views/profile.vue'
import store from '@/libraries/store'
import router from '@/libraries/router'
import '@/libraries/axios'

store.dispatch = jest.fn(() => Promise.resolve())
store.commit("user/login", "mock_key")
router.push = jest.fn()
let wrapper = shallowMount(profile, {
  global: {
    plugins: [store, router],
    mocks: {
      $t: jest.fn(),
      is_auth: true
    }
  }
})
describe("ProfileView", ()=>{  

    test("Fetch profile data if user is authorized", async ()=>{
        // @ts-ignore
        expect(store.dispatch.mock.calls[0][0]).toEqual("profile/FETCH_PROFILE")
    })

    test("Redirect to signup if user isn't authorized", async ()=>{
        wrapper.vm.$store.commit("user/logout")
        await wrapper.vm.$nextTick()
        // @ts-ignore
        expect(router.push.mock.calls[0][0]).toEqual({name: "signup"})
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
