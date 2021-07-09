import { createApp } from 'vue'
import App from './App.vue'
import router from './libraries/router'
import store from './libraries/store'
import _ from 'lodash';
import './libraries/axios'
import i18n from './libraries/i18n'
import langDetector from './libraries/i18n/langDetector'
import css from '@/assets/css/style.css'

createApp(App).use(i18n).use(store).use(router).use(_).use(langDetector).mount('#app')