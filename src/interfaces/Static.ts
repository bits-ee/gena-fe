interface Location{
    id: number,
    zipcode: string,
    name: string,
    display_name: string,
    region: string,
    lat: number,
    lng: number
}
interface GuestLocation{
    id: number,
    zipcode: string,
    "name": string,
    "region": string
}
interface RegData{
    email: string,
    token: string,
    lang: string
}