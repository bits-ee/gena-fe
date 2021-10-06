import { shallowMount } from '@vue/test-utils'
import store from '@/libraries/store'
import avatar from '@/components/avatar.vue'

store.dispatch = jest.fn(() => Promise.resolve())
let wrapper = shallowMount(avatar, {
  attachTo: document.body,
  global: {
    mocks: {
      $store: store
    }
  }
})

describe("AvatarComponent", ()=>{

  beforeEach(async ()=>{
    jest.clearAllMocks()
  })

  //
  test("Show avatar, delete and update buttons if avatar exist", async ()=>{
    wrapper.vm.$store.commit("profile/setAvatar", "avatar.jpg")
    await wrapper.vm.$nextTick()
    
    expect(wrapper.find("#avatar").exists()).toBe(true)
    expect(wrapper.find("#avatar-upload").exists()).toBe(true)
    expect(wrapper.find("#avatar-upload-label").exists()).toBe(true)
    expect(wrapper.find("#avatar-delete").exists()).toBe(true)

    expect(wrapper.find("#avatar-default").exists()).toBe(false)
    expect(wrapper.find("#avatar-add-label").exists()).toBe(false)
  })

  //
  test("Show default avatar and add-avatar button if avatar doesn't exist", async ()=>{
    wrapper.vm.$store.commit("profile/setAvatar", null)
    await wrapper.vm.$nextTick()

    expect(wrapper.find("#avatar").exists()).toBe(false)
    expect(wrapper.find("#avatar-upload-label").exists()).toBe(false)
    expect(wrapper.find("#avatar-delete").exists()).toBe(false)

    expect(wrapper.find("#avatar-upload").exists()).toBe(true)
    expect(wrapper.find("#avatar-default").exists()).toBe(true)
    expect(wrapper.find("#avatar-add-label").exists()).toBe(true)
  })

  //
  test("Delete avatar", async ()=>{
    wrapper.vm.$store.commit("profile/setAvatar", "avatar.jpg")
    await wrapper.vm.$nextTick()

    let button = wrapper.find("#avatar-delete")
    button.trigger("click")
    //@ts-ignore
    expect(store.dispatch.mock.calls[0][0]).toEqual("profile/DELETE_AVATAR")
  })

  //
  test("Update avatar, then clear the file input form", async ()=>{
    wrapper.vm.$store.commit("profile/setAvatar", "avatar.jpg")
    await wrapper.vm.$nextTick()

    let button = wrapper.find("#avatar-upload")
    button.trigger("change")

    // @ts-ignore
    expect(store.dispatch.mock.calls[0][0]).toEqual("profile/UPDATE_AVATAR")
    expect((wrapper.find("#avatar-upload").element as HTMLInputElement).value).toEqual("")
  })
})

//VUEX DATA
// string 'avatar'
// string 'avatar_url'

// MOUNT
//1. if avatar exist, show image with src='avatar_url'. Else shows default avatar "@/assets/images/profile/avatar_default.jpg"
//2. if avatar exist, show update('bi-pencil' bootstrap class) and delete('bi-x-lg' bootstrap class) icons on hover
//3. if avatar does not exist, shows add-image('bi-plus-lg' bootstrap class) icon on hover

// DELETE
//1. on delete action calls vuex DELETE_AVATAR action

// UPDATE
//1. on update action calls vuex UPDATE_AVATAR action with 'avatar-upload' element value as payload
//2. after call value of element with id 'avatar-upload' must be empty


// P.S
// vuex api calls shouldn't be tested hereT
// there is just checking if correct action was called 
// all api calls will be tested separated from components