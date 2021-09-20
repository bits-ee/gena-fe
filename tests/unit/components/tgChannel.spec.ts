import tgChannel from '@/components/tgChannel.vue'

//VUEX DATA
// 'tgBotName'

// MOUNT
//1. load telegram widget using script
    //<src> = 'https://telegram.org/js/telegram-widget.js?14'
    //<data-telegram-login> = 'tgBotName'
//2. on widget click call 'VERIFY_TG_CHANNEL' action with telegram 'user' as payload