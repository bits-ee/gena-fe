//profile details
interface PersonalDetails {
  firstname: string
  lastname: string
  language: string
}

//user's personal locations
interface UserLocation {
  id: number
  title: string
  location_id: number
  street_name: string
  street_number: number
  services: Service[]
}

//notifications channels
interface Channels {
  email: string | null
  tg: string | null
}

//user's services notifications settings
interface Service {
  service_id: number
  name: string
  channel: string
  frequency: string
}
