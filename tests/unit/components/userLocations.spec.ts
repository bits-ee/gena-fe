import userLocations from '@/components/userLocations.vue'

describe("UserLocationsComponent", ()=>{
    test("Show user locations forms", ()=>{
        
    })

    test("Show new location form", ()=>{
        
    })

    test("Update user location", ()=>{
        
    })

    test("Delete user location", ()=>{
        
    })

    test("Add user location", ()=>{
        
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