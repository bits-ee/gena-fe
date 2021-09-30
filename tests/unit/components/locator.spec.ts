import locator from '@/components/locator.vue'

describe("LocatorComponent", ()=>{
    test("Initialize google map", ()=>{
        
    })
    
    test("Drop google map markers", ()=>{
        
    })

    test("Delete and reload google map on language changes", ()=>{
        
    })

    test("Remove google map on route changes", ()=>{

    })

    test("Open infowindow on marker click or selecting location in 'tomSelect' component", ()=>{
        
    })

    test("Show location name, services and signup button inside infowindows", ()=>{
        
    })

    test("Show google form link if 'tomSelect' location is not supported", ()=>{
        
    })

    test("Set guest location on signup from infowindow", ()=>{
        
    })
})


//VUES DATA
// Location[] 'locations'
// Location[] 'locations_all'
// GuestLocation 'guest_location'
// string 'googleMapKey'

// MOUNT
//1. init google_map by script:
    //<src> = 'https://maps.googleapis.com/maps/api/js?' + googleMapKey + 'language=' + $i18n.locale;
    //<id> = 'google-maps-script'
//2. reload map on $i18n.locale change
//3. drop markers for all locations in 'locations'
//4. on marker click show infowindow with location data and 'sign_up' button
//5. init 'tomSelect' component

// tomSelect
//1. on @change, open marker's infowindow, with id = @change value
//2. if such marker doesn't exist, show messge with link to google form

// sign_up
//1. set the value to marker's zipcode for 'guest_location'
//2. redirect to 'signup' component