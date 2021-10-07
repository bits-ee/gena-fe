import { shallowMount } from '@vue/test-utils'
import personalDetails from '@/components/personalDetails.vue'
import store from '@/libraries/store'

store.dispatch = jest.fn(() => Promise.resolve())
let wrapper = shallowMount(personalDetails, {
    global: {
        plugins: [store],
        mocks: {
            $t: jest.fn(),
        }
    }
});

describe("PersonalDetailsComponent", ()=>{
    test("Show personal details input fields", ()=>{
        expect(wrapper.find("input#firstname").exists()).toBe(true)
        expect(wrapper.find("input#lastname").exists()).toBe(true)
        expect(wrapper.find("select#language").exists()).toBe(true)
    })

    test("Create copy of vuex data (calls by value)", ()=>{
        expect(wrapper.vm.personal_details_copy).not.toBe(wrapper.vm.$store.getters["profile/personal_details"])
    })

    test("Update personal details", ()=>{
        let button = wrapper.find("input[type='submit']")
        button.trigger("click")
        //@ts-ignore
        expect(store.dispatch.mock.calls[0][0]).toEqual("profile/UPDATE_DETAILS")
        //@ts-ignore
        expect(store.dispatch.mock.calls[0][1]).toEqual(wrapper.vm.personal_details_copy)
    })

})


// MOUNT
//1. create copy of vuex's 'personal_details' as 'personal_details_copy'
//2. show input fields for firstname and lastname, show select field for language; set values of 'personal_details_copy'
//3. show submit button calls 'UPDATE_DETAILS' on click

// UPDATE
//1. call 'UPDATE_DETAILS' action with 'personal_details_copy' as payload
//2. if failed get valid 'personal_details' from vuex