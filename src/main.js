import { createApp } from 'vue/dist/vue.esm-bundler'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"
import {createI18n} from "vue-i18n";
import {messages} from "./messages.js"
import router from "./router"

const i18n = createI18n({
    locale: 'no', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages, // set locale messages
    // If you need to specify other options, you can set other options
    // ...
})

// createApp(App).use(i18n).use(router).mount('#app')
// 5. Create and mount the root instance.
const app = createApp(App)
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)
app.use(i18n)

app.mount('#app')