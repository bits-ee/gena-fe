import { shallowMount } from '@vue/test-utils'
import notification from '@/components/notification.vue'
import store from '@/libraries/store'

store.dispatch = jest.fn(() => Promise.resolve())
let wrapper = shallowMount(notification, {
    global: {
        plugins: [store],
        mocks: {
            $t: jest.fn()
        }
    }
});

describe("NotificationComponent", ()=>{
    test("Show notification", async ()=>{
        let message = "test_message"
        wrapper.vm.$store.commit("notification/notify", message)
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toMatch(message)
    })

    test("Notification auto-hiding", async ()=>{
        let message = "test_message"
        let delay = 3200
        wrapper.vm.$store.commit("notification/notify", message)
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toMatch(message)
        await new Promise(res => setTimeout(() => {
            expect(wrapper.text()).not.toMatch(message)
            res(null)
        }, delay))
    })

    test("Notification updating", async ()=>{
        let message = "test_message"
        let new_message = "new_message"
        wrapper.vm.$store.commit("notification/notify", message)
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toMatch(message)
        wrapper.vm.$store.commit("notification/notify", new_message)
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toMatch(new_message)
    })

    test("Close notification", async ()=>{
        let message = "test_message"
        let button = wrapper.find("button")
        wrapper.vm.$store.commit("notification/notify", message)
        await wrapper.vm.$nextTick()
        button.trigger("click")
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).not.toMatch(message)
    })
})

//VUEX DATA
// boolean 'is_error'
// boolean 'show'
// string 'message'
// number 'time'


// 'is_error'
//1. if 'is_error' is false, add class 'alert-success' and remove class 'alert-danger'
//2. if 'is_error' is true, add class 'alert-danger' and remove class 'alert-success'


// 'show'
//1. if 'show' is false, add class 'd-none' and remove class 'show'
//2. if 'show' is true, add class 'show' and remove class 'd-none'
//3. show notification with 'message' param
//4. show 'close' button, call 'clear' mutation on click

// MOUNT
//1. 3,2 seconds after notification had shown, call 'clear' mutation
//2. on route change call 'clear' mutation
