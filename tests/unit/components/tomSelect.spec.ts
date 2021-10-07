import { shallowMount } from '@vue/test-utils'
import tomSelect from '@/components/tomSelect.vue'

let wrapper = shallowMount(tomSelect, {
    props: {
        locations: [
            {id: 1, display_name: "a"},
            {id: 2, display_name: "b"}
        ]
    },
    global: {
        mocks: {
            $t: jest.fn()
        }
    }
});
describe("TomSelectComponent", ()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })

    test("'selectedValue' prop by default", async ()=>{
        let selectedValue = 1
        wrapper.setProps({ selectedValue })
        await wrapper.vm.$nextTick()    
        expect(wrapper.vm.ts.getValue()).toBe(selectedValue.toString())
    })

    test("View search button if 'viewSearchButton' prop is true, hide if false", async ()=>{
        expect(wrapper.find("button").exists()).toBe(true)
        wrapper.setProps({ viewSearchButton: false })
        await wrapper.vm.$nextTick()
        expect(wrapper.find("button").exists()).toBe(false)
    })

    test("Check return value", async ()=>{
        let selectedValue = 1
        wrapper.setProps({ selectedValue })
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted("tsChanged")).toEqual([[selectedValue.toString()]])
    })
    
})

//PROPS
// Location[] 'locations'
// number 'selectedValue'
// boolean 'viewSearchButton'; default true

// MOUNT
//1. show input field with location have 'selectedValue' id
//2. if location not found, show empty input field
//3. 'viewSearchButton' is true, view search button

// @change
//1. return id of selected location