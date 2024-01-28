<script setup lang="ts">
/* IMPORTS */
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import NavbarMenu from '@/layouts/components/NavbarMenu.vue'
import I18n from '@/layouts/components/I18n.vue'
import { ROUTE_NAMES } from '../../router/name.enum'
import { useI18n } from 'vue-i18n'

/* STATES */
const lastPosition = ref<number>(0)
const limitPosition = ref<number>(500)
const scrolled = ref<boolean>(false)
const isDrawer = ref<boolean>(false)
const { md } = useBreakpoints(breakpointsTailwind)
const { t: $t } = useI18n()

const menus = computed<{ routeName: string; title: string }[]>(() => [
    { routeName: ROUTE_NAMES.BLANK, title: $t('blank') },
    { routeName: ROUTE_NAMES.POST, title: $t('post') },
    { routeName: ROUTE_NAMES.STORE, title: $t('store') },
    { routeName: ROUTE_NAMES.DOCUMENT, title: $t('document') }
])
const eventName = computed(() => import.meta.env.VITE_EVENT_NAME)
// const menus = [
//     { routeName: ROUTE_NAMES.BLANK, title: $t('blank') },
//     { routeName: ROUTE_NAMES.POST, title: $t('post') },
//     { routeName: ROUTE_NAMES.STORE, title: $t('store') },
//     { routeName: ROUTE_NAMES.DOCUMENT, title: $t('document') }
// ]
/* METHODS */
const onHandleScroll = (): void => {
    if (
        lastPosition.value < window.scrollY &&
        limitPosition.value < window.scrollY
    )
        scrolled.value = true // Move Up

    if (lastPosition.value > window.scrollY) scrolled.value = false // Move Down

    lastPosition.value = window.scrollY
}

const onCloseDrawer = (): void => {
    isDrawer.value = false
}

onMounted(() => {
    window.addEventListener('scroll', onHandleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', onHandleScroll)
})
</script>

<template>
    <nav :class="[scrolled ? 'hide' : '', 'navbar']">
        <div class="container flex items-center justify-between">
            <RouterLink
                to="/"
                class="navbar__logo"
            >
                <XIcon
                    :class="[ 'text-xl', eventName === 'CNY' ? 'text-red-600' : 'text-teal-600' ]"
                    icon="mingcute:vue-fill"
                />
                <h1 class="title">
                    3 Boilerplate
                </h1>
                <div
                    v-if="false"
                    class="absolute top-5 -left-2.5"
                >
                    <img
                        src="@/assets/images/events/tassel.gif"
                        alt=""
                        class="w-10"
                    >
                </div>
            </RouterLink>
            <NavbarMenu :items="menus" />
            <div class="navbar__action">
                <I18n />
                <template v-if="md">
                    <XSwitchMode />
                    <a
                        href="https://github.com/tuongmengleang"
                        target="_blank"
                        class="text-gray-500 hover:text-gray-600"
                    >
                        <XIcon
                            class="text-xl"
                            icon="tabler:brand-github-copilot"
                        />
                    </a>
                </template>
                <XBurgerMenu
                    v-if="!md"
                    :is-x="isDrawer"
                    @on-toggle="isDrawer = !isDrawer"
                />
            </div>
            <XDrawerBuilder
                v-if="!md"
                :is-open="isDrawer"
                :speed="500"
                max-width="300px"
                @close="onCloseDrawer"
            >
                <div class="pt-4">
                    <NavbarMenu
                        :items="menus"
                        mode="horizontal"
                    />
                    <XSwitchMode />
                </div>
            </XDrawerBuilder>
        </div>
        <div
            v-if="eventName === 'CNY'"
            class="absolute top-[63px] left-0 w-full flex items-center justify-between z-10 overflow-hidden"
        >
            <img
                v-for="n in 10"
                :key="n"
                src="@/assets/images/events/lantern.png"
                alt="Lantern Chinese"
                class="w-32"
            >
        </div>
    </nav>
</template>

<style scoped lang="scss">
@import '@/@core/scss/base/_variables.scss';
@import '@/@core/scss/base/_mixins.scss';

.navbar {
    @apply sticky top-0 w-full py-3 border-b border-b-gray-200 dark:border-b-gray-800 bg-white dark:bg-gray-900;
    will-change: transform;
    transition: transform 200ms linear;
    z-index: 2;
    //@include glassMorphism($bg-glass-color);

    &.hide {
        transform: translateY(-100%);
    }

    &__logo {
        @apply relative flex items-center gap-2;
        .title {
            @apply text-base font-medium text-gray-900 dark:text-gray-100;
        }
    }

    &__menu {
        @apply hidden md:flex relative items-center gap-10 text-sm font-medium;

        li {
            @apply text-gray-500 dark:text-gray-400 hover:text-gray-950 hover:font-medium dark:hover:text-white;
            a {
                @apply block px-2 py-1 rounded-xl;

                &.router-link-active {
                    @apply bg-gradient-to-r from-yellow-200 via-green-200 to-green-500 text-gray-950;
                }
            }
        }
    }

    &__action {
        @apply relative flex items-center gap-3;
    }
}
</style>

<style lang="scss">

</style>
