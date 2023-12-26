import { ROUTE_NAMES } from './name.enum'
import type { RouteRecordRaw } from 'vue-router'

export interface RouteList {
    name: string
    url: { name: ROUTE_NAMES }
}

export const routes: Readonly<RouteRecordRaw[]> = [
    {
        path: '',
        name: ROUTE_NAMES.INDEX,
        component: () => import('@/pages/index.vue'),
        meta: {
            title: ''
        }
    },
    {
        path: '/blank',
        name: ROUTE_NAMES.BLANK,
        component: () => import('@/pages/blank.vue'),
        meta: {
            title: 'Blank Page'
        }
    },
    {
        path: '/post',
        name: ROUTE_NAMES.POST,
        component: () => import('@/pages/post/index.vue'),
        meta: {
            title: 'Post Page'
        }
    },
    {
        path: '/post/:id',
        name: ROUTE_NAMES.POST_DETAIL,
        component: () => import('@/pages/post/[id].vue')
    },
    {
        path: '/store',
        name: ROUTE_NAMES.STORE,
        component: () => import('@/pages/store.vue')
    },
    {
        path: '/document',
        name: ROUTE_NAMES.DOCUMENT,
        component: () => import('@/pages/document.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: ROUTE_NAMES.NOT_FOUND,
        component: () => import('@/pages/404.vue')
    }
]
