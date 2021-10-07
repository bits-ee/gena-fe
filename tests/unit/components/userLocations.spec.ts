import { shallowMount } from '@vue/test-utils'
import userLocations from '@/components/userLocations.vue'
import tomSelect from '@/components/tomSelect.vue'
import locationServices from '@/components/locationService.vue'
import store from '@/libraries/store'

store.dispatch = jest.fn(() => Promise.resolve())
let wrapper = shallowMount(userLocations, {
  global: {
    mocks: {
      $store: store,
      $t: jest.fn()
    }
  }
})

describe("UserLocationsComponent", ()=>{
  beforeEach(()=>{
    jest.clearAllMocks()
  })

  test("Show all forms", async ()=>{
    let locations = [
      {id: 1, display_name: "a"},
      {id: 2, display_name: "b"}
    ]
    let user_locations = [
      {
        id: 1,
        location_id: 1,
        services: [
          {
            channel: "Telegram",
            frequency: "daily",
            name: "service_1",
            service_id: 1
          } as Service
        ],
        street_name: "street_name",
        street_number: 1,
        title: "title"
      } as UserLocation
    ]
    wrapper.vm.$store.commit("profile/setLocations", user_locations)
    wrapper.vm.$store.commit("statics/setLocations", locations)
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll("input[name='user-location-title']").length).toEqual(user_locations.length + 1)
    expect(wrapper.findAll("input[name='user-location-street-name']").length).toEqual(user_locations.length + 1)
    expect(wrapper.findAll("input[name='user-location-street-number']").length).toEqual(user_locations.length + 1)
    expect(wrapper.findAllComponents(locationServices).length).toEqual(user_locations.length + 1)
    expect(wrapper.findAllComponents(tomSelect).length).toEqual(user_locations.length + 1)
  })

  test("Update user location", ()=>{
    let button = wrapper.find("button#update-location")
    button.trigger("click")
    //@ts-ignore
    expect(store.dispatch.mock.calls[0][0]).toEqual("profile/UPDATE_USER_LOCATION")
  })

  test("Delete user location", ()=>{
    let button = wrapper.find("button#delete-location")
    button.trigger("click")
    //@ts-ignore
    expect(store.dispatch.mock.calls[0][0]).toEqual("profile/DELETE_USER_LOCATION")
  })

  test("Add user location", ()=>{
    let button = wrapper.find("button#add-location")
    button.trigger("click")
    //@ts-ignore
    expect(store.dispatch.mock.calls[0][0]).toEqual("profile/ADD_USER_LOCATION")
  })
    
})

//VUEX DATA
// Channels 'channels'
// UserLocation[] 'user_locations'
// Location[] 'locations'
// number 'guest_location' (local_storage?) 

// MOUNT
//1. for all 'user_locations' show input fields: [title, location, street_name, street_number] with user_location data
//2. for all 'user_locations' show 'update' and 'delete' buttons
//3. on 'update' button, call 'UPDATE_USER_LOCATION' action on click with 'user_location' as payload
//4. on 'delete' button, call 'DELETE_USER_LOCATION' action on click with 'user_location' as payload
//5. show 'new_location' form with input fields: [title, location, street_name, street_number]
//7. set the value to 'guest_location' for the 'new_location.location_id'
//6. show 'add' button, call 'ADD_USER_LOCATION' with 'new_location' data as payload

// UPDATE_USER_LOCATION and ADD_USER_LOCATION
//1. location field is required