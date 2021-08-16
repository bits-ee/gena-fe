interface ProfileState {
    personal_details: PersonalDetails
    avatar: string | null
    user_locations: UserLocation[]
    channels: Channels
}

interface ConfigState {
    googleRecaptchaSiteKey: string
    googleMapKey: string
    tgBotName: string
    appRoot: string
    locationRequestForm: string
}

interface StaticState {
    locations: Location[],
    locations_all: Location[]
}

interface UserState {
    session_key: string
    is_auth: boolean
}
interface NotificationState {
    message: string
    is_error: boolean
    show: boolean
}



