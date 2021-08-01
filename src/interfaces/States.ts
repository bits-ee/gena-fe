interface ProfileState {
    personal_details: PersonalDetails
    avatar: string
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
}

interface UserState {
    session_key: string
    is_auth: boolean
}



