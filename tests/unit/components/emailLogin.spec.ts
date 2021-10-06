import { flushPromises, shallowMount } from '@vue/test-utils'
import emailLogin from '@/components/emailLogin.vue'
import router from '@/libraries/router'
import store from '@/libraries/store'

store.dispatch = jest.fn(() => Promise.resolve())
declare var grecaptcha: any
let wrapper = shallowMount(emailLogin, {
  global: {
    mocks: {
      $store: store,
      $route: router,
      $i18n:{
        locale: "en"
      },
      $t: jest.fn()
    }
  }
});

describe("EmailLoginComponent", ()=>{
  beforeEach(()=>{
    jest.clearAllMocks()
  })

  test("Initialize ReCaptcha on mount", async ()=>{
    expect(wrapper.vm.recaptcha_script.src).toEqual("https://www.google.com/recaptcha/api.js?render="+wrapper.vm.googleRecaptchaKey+"&onload=grecaptchaCallBack")
    expect(document.body.contains(wrapper.vm.recaptcha_script)).toBe(true)
  })

  test("Show input field for email on mount", ()=>{
    expect(wrapper.vm.state).toEqual("input")
    expect(wrapper.find("input").exists()).toBe(true)
    expect(wrapper.find("button").exists()).toBe(true)
  })

  test("Show error if email don't match regex", ()=>{
    let email = "incorrect_email"
    wrapper.setData({ email: email })
    wrapper.find("button").trigger("click")
    expect((wrapper.vm.errors as []).length > 0).toBe(true)
  })

  test("Submit email channel", async ()=>{
    let email = "email@test.tt"
    let state = "input"
    let is_channel = false
    wrapper.setData({ state: state, email: email, grecaptcha: {execute: jest.fn(() => Promise.resolve())} })
    wrapper.setProps({ is_channel: is_channel })
    await wrapper.vm.$nextTick()
    wrapper.find("button#submit-input").trigger("click")
    await flushPromises()
    //@ts-ignore
    expect(store.dispatch.mock.calls[0][0]).toEqual("user/REG_EMAIL")
  })

  test("Submit email login", async ()=>{
    let email = "email@test.tt"
    let state = "input"
    let is_channel = true
    wrapper.setData({ state: state, email: email, grecaptcha: {execute: jest.fn(() => Promise.resolve())} })
    wrapper.setProps({ is_channel: is_channel })
    await wrapper.vm.$nextTick()
    wrapper.find("button#submit-input").trigger("click")
    await flushPromises()
    // @ts-ignore
    expect(store.dispatch.mock.calls[0][0]).toEqual("profile/ADD_EMAIL_CHANNEL")
  })

  test("Verify email channel", async ()=>{
    let email = "email@test.tt"
    let state = "verify"
    let is_channel = false
    wrapper.setData({ state: state })
    wrapper.setProps({ is_channel: is_channel })
    await wrapper.vm.$nextTick()
    wrapper.find("button#verify").trigger("click")
    // @ts-ignore
    expect(store.dispatch.mock.calls[0][0]).toEqual("user/VERIFY_EMAIL")
  })

  test("Verify email login", async ()=>{
    let email = "email@test.tt"
    let state = "verify"
    let is_channel = true
    wrapper.setData({ state: state })
    wrapper.setProps({ is_channel: is_channel })
    await wrapper.vm.$nextTick()
    wrapper.find("button#verify").trigger("click")
    // @ts-ignore
    expect(store.dispatch.mock.calls[0][0]).toEqual("profile/VERIFY_EMAIL_CHANNEL")
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


