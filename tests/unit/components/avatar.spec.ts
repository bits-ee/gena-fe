import avatar from '@/components/avatar.vue'

describe("AvatarComponent", ()=>{

  test("Show avatar, delete and update buttons if avatar exist", ()=>{

  })

  test("Show default avatar and add-avatar button if avatar doesn't exist", ()=>{

  })

  test("Delete avatar", ()=>{

  })

  test("Update avatar, then clear the file input form", ()=>{
      
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