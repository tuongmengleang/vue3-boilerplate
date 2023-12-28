import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, _, next) => {
    // See further down below for how we setup this data
    let title = import.meta.env.VITE_APP_NAME
    if (to.meta.title) {
        title += ' - ' + to.meta.title
    }
    document.title = title
    // Continue resolving the route
    next()
})

export default router
