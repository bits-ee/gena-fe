
import { shallowMount } from "@vue/test-utils"
import locationService from '@/components/locationService.vue'
import '@/types/Service'
import '@/types/Channels'
import store from '@/libraries/store'

store.dispatch = jest.fn(() => Promise.resolve())
let wrapper = shallowMount(locationService, {
  global: {
    mocks: {
      $t: jest.fn()
    }
  }
})
describe("LocationServicesComponent", ()=>{
  beforeEach(()=>{
      jest.clearAllMocks()
  })

  //
  test("Show location services", async ()=>{
    let services = <Service[]>[
      {
        service_id: 1,
        name: "service_1",
        frequency: "",
        channel: "tg"
      },
      {
        service_id: 2,
        name: "service_2",
        frequency: "",
        channel: "email"
      }
    ]
    let channels = <Channels>{
      email: "email@test.tt",
      tg: "tg_username"
    }
    wrapper.setProps({ services: services, channels: channels })
    await wrapper.vm.$nextTick()
    services.forEach(service => {
      let channel = wrapper.find("#service-channel-"+service.service_id)
      expect(channel.exists()).toBe(true)
      expect(channel.findAll('option').length).toEqual(Object.keys(wrapper.vm.channels).length + 1)
      
      let frequencies = wrapper.find("#service-frequency-"+service.service_id)
      expect(frequencies.exists()).toBe(true)
      expect(frequencies.findAll('option').length).toEqual(Object.keys(wrapper.vm.frequencies).length + 1)
    });
  })
})

// PROPS
//1. Service[] services
//2. Channels channels
//3*. frequencies are not supported now

// MOUNT
//1. for all services show 'select channel' field and 'select frequency' field