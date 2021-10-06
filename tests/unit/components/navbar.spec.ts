import { shallowMount } from '@vue/test-utils'
import logo from '@/components/logo.vue'
import navbar from '@/components/navbar.vue'
import store from '@/libraries/store'
import router from '@/libraries/router'
import '@/libraries/axios'

store.dispatch = jest.fn(() => Promise.resolve())
let wrapper = shallowMount(navbar, {
    global: {
        plugins: [router, store],
      mocks: {
        $t: jest.fn(),
        $i18n: {
            locale: ""
        }
      }
    }
  });

describe("NavbarComponent", ()=>{
    
    beforeEach(()=>{
        jest.clearAllMocks()
    })

    test("Show navbar logo", ()=>{
        expect(wrapper.findComponent(logo).exists()).toBe(true)
    })

    test("Show login and signup links if user isn't authorized", async ()=>{
        wrapper.vm.$store.commit("user/logout")
        await wrapper.vm.$nextTick()
        expect(wrapper.find("#login-link").exists()).toBe(true)
        expect(wrapper.find("#registration-link").exists()).toBe(true)
    })

    test("Show avatar(profile link) and logout button if user is authorized", async ()=>{
        wrapper.vm.$store.commit("user/login", "mock_key")
        await wrapper.vm.$nextTick()
        expect(wrapper.find("#profile-link").exists()).toBe(true)
        expect(wrapper.find("#logout-link").exists()).toBe(true)
    })

    test("Show language switcher", async ()=>{
        expect(wrapper.find("#language-dropdown").exists()).toBe(true)
    })

    test("Switch languages", ()=>{
        let dropdown = wrapper.find("#language-dropdown")
        dropdown.trigger("click")
        let items = dropdown.findAll(".dropdown-item")
        items[0].trigger("click")
        expect(wrapper.vm.$i18n.locale).toEqual("en")
        items[1].trigger("click")
        expect(wrapper.vm.$i18n.locale).toEqual("de")
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