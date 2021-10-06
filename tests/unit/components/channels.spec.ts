import { shallowMount } from '@vue/test-utils'
import channels from '@/components/channels.vue'
import emailLogin from '@/components/emailLogin.vue'
import tgChannel from '@/components/tgChannel.vue'
import store from '@/libraries/store'

store.dispatch = jest.fn(() => Promise.resolve())
let wrapper = shallowMount(channels, {
  global: {
    mocks: {
      $store: store,
      $t: jest.fn()
    }
  }
})

describe("ChannelsComponent", ()=>{

  beforeEach(()=>{
    jest.clearAllMocks()
  })

  //
  test("Show email if channel connected", async ()=>{
    let email = 'email@test.tt'
    let tg = null
    wrapper.vm.$store.commit("profile/setChannels", {email: email, tg: tg})
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toMatch(email)
  })

  //
  test("Show telegram username if channel connected", async ()=>{
    let email = null
    let tg = 'tg_username'
    wrapper.vm.$store.commit("profile/setChannels", {email: email, tg: tg})
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toMatch(tg)
  })

  //
  test("Show 'emailLogin' component if email channel not connected", async ()=>{
    let email = null
    let tg = null
    wrapper.vm.$store.commit("profile/setChannels", {email: email, tg: tg})
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(emailLogin).exists()).toBe(true)
  })

  //
  test("Show 'tgChannel' component if telegram channel not connected", async ()=>{
    let email = null
    let tg = null
    wrapper.vm.$store.commit("profile/setChannels", {email: email, tg: tg})
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(tgChannel).exists()).toBe(true)
  })

  //
  test("Show email 'disconnect' button if more then 1 channel connected", async ()=>{
    let email = 'email@test.tt'
    let tg = 'tg_username'
    wrapper.vm.$store.commit("profile/setChannels", {email: email, tg: tg})
    await wrapper.vm.$nextTick()
    expect(wrapper.find("#email-disconnect").exists()).toBe(true)
    expect(wrapper.find("#email-disconnect").classes("disabled")).toBe(false)
  })

  //
  test("Show telegram 'disconnect' button if more then 1 channel connected", async ()=>{
    let email = 'email@test.tt'
    let tg = 'tg_username'
    wrapper.vm.$store.commit("profile/setChannels", {email: email, tg: tg})
    await wrapper.vm.$nextTick()
    expect(wrapper.find("#tg-disconnect").exists()).toBe(true)
    expect(wrapper.find("#tg-disconnect").classes("disabled")).toBe(false)
  })

  //
  test("Show email 'can't disconnect button' if the only 1 channel connected", async ()=>{
    let email = 'email@test.tt'
    let tg = null
    wrapper.vm.$store.commit("profile/setChannels", {email: email, tg: tg})
    await wrapper.vm.$nextTick()
    expect(wrapper.find("#email-disconnect").exists()).toBe(true)
    expect(wrapper.find("#email-disconnect").classes("disabled")).toBe(true)
  })

  //
  test("Show telegram 'can't disconnect button' if the only 1 channel connected", async ()=>{
    let email = null
    let tg = 'tg_username'
    wrapper.vm.$store.commit("profile/setChannels", {email: email, tg: tg})
    await wrapper.vm.$nextTick()
    expect(wrapper.find("#tg-disconnect").exists()).toBe(true)
    expect(wrapper.find("#tg-disconnect").classes("disabled")).toBe(true)
  })

  //
  test("Delete email channel", async ()=>{
    let email = 'email@test.tt'
    let tg = 'tg_username'
    wrapper.vm.$store.commit("profile/setChannels", {email: email, tg: tg})
    await wrapper.vm.$nextTick()
    let button = wrapper.find("#email-disconnect")
    button.trigger("click")
    //@ts-ignore
    expect(store.dispatch.mock.calls[0][0]).toEqual("profile/DELETE_EMAIL_CHANNEL")
  })

  //
  test("Delete telegram channel", async ()=>{
    let email = 'email@test.tt'
    let tg = 'tg_username'
    wrapper.vm.$store.commit("profile/setChannels", {email: email, tg: tg})
    await wrapper.vm.$nextTick()
    let button = wrapper.find("#tg-disconnect")
    button.trigger("click")
    //@ts-ignore
    expect(store.dispatch.mock.calls[0][0]).toEqual("profile/DELETE_TG_CHANNEL")
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
