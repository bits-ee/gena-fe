import '@/types/ConfigState'

export default {
    init(state: ConfigState, config: ConfigState) {
      Object.assign(state, config)       
    }
}