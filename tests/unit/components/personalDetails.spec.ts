import personalDetails from '@/components/personalDetails.vue'

describe("PersonalDetailsComponent", ()=>{
    test("Show personal details input fields", ()=>{
        
    })

    test("Create copy of vuex data (calls by value)", ()=>{
        
    })

    test("Update personal details", ()=>{

    })

})


// MOUNT
//1. create copy of vuex's 'personal_details' as 'personal_details_copy'
//2. show input fields for firstname and lastname, show select field for language; set values of 'personal_details_copy'
//3. show submit button calls 'UPDATE_DETAILS' on click

// UPDATE
//1. call 'UPDATE_DETAILS' action with 'personal_details_copy' as payload
//2. if failed get valid 'personal_details' from vuex