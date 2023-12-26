import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import App from '@/App.vue'
import '@/@core/scss/base/tailwind.css'
import '@/@core/scss/base/_index.scss'
import { loadFonts } from '@/plugins/webfontloader'
import i18n from '@/plugins/i18n'
import { Icon } from '@iconify/vue'
import InfiniteLoading from 'v3-infinite-loading' // Infinite Scrolling
import 'v3-infinite-loading/lib/style.css'
import VueLazyLoad from 'vue3-lazyload' // Lazy Load Image

/* REGISTER DIRECTIVE */
import AnimatedCounter from '@/directives/animated-counter.directive' //

loadFonts()

// CREATE VUE APP
const app = createApp(App)
const pinia = createPinia()

// REGISTER GLOBAL COMPONENTS
app.component('XIcon', Icon)
app.component('XInfiniteLoading', InfiniteLoading)

// REGISTER GLOBAL DIRECTIVE
app.directive('animated-counter', AnimatedCounter)

app.use(VueLazyLoad, {})

app.use(router).use(pinia).use(i18n).mount('#app')
