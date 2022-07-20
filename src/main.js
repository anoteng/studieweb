import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"
import {createI18n} from "vue-i18n";
import {messages} from "./messages.js"

const i18n = createI18n({
    locale: 'no', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages, // set locale messages
    // If you need to specify other options, you can set other options
    // ...
})
createApp(App).use(i18n).mount('#app')
