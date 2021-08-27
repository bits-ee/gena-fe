import { createApp } from 'vue'
import _ from 'lodash'
import App from './App.vue'
import i18n from './libraries/i18n'
import store from './libraries/store'
import router from './libraries/router'
import langDetector from './libraries/i18n/langDetector'
import './libraries/axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.min.js'

createApp(App).use(i18n).use(store).use(router).use(_).use(langDetector).mount('#app')