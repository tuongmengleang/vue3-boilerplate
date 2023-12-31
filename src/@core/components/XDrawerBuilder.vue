<script setup lang="ts">
/* IMPORTS */
import { onClickOutside } from '@vueuse/core'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

/* STATES */
/* PROPS */
const props = withDefaults(
    defineProps<{
        isOpen: boolean
        maxWidth?: string
        speed?: number
    }>(),
    { isOpen: false, maxWidth: '400px', speed: 300 }
)

const route = useRoute()
const drawer = ref<HTMLElement | null>(null)
const isVisible = ref<boolean>(false)
const $emit = defineEmits([ 'close' ])

//* * WATCH PROPS **//
watch(
    () => props.isOpen,
    (val) => {
        if (val) {
            toggleBackgroundScrolling(true)
            isVisible.value = true
        } else {
            toggleBackgroundScrolling(false)
            setTimeout(() => (isVisible.value = false), props.speed)
        }
    }
)

//* * WATCH ROUTE **//
watch(
    () => route.name,
    () => {
        onClickOutsideHandler()
    }
)

onClickOutside(drawer, () => onClickOutsideHandler())

const toggleBackgroundScrolling = (enable: boolean): void => {
    // Access the body element in the setup function
    const bodyElement = document.body
    bodyElement.style.overflow = enable ? 'hidden' : ''
}

const onClickOutsideHandler = (): void => {
    $emit('close', false)
}
</script>

<template>
    <!--    <aside-->
    <!--        :class="[-->
    <!--            'aside',-->
    <!--            isOpen ? 'open' : '',-->
    <!--            isVisible ? 'visible' : 'invisible'-->
    <!--        ]"-->
    <!--    >-->
    <!--        <div-->
    <!--            class="aside__overlay"-->
    <!--            :style="{ transitionDuration: `${speed}ms` }"-->
    <!--        />-->
    <!--        <div-->
    <!--            ref="drawer"-->
    <!--            :class="['aside__content']"-->
    <!--            :style="{ maxWidth: maxWidth, transitionDuration: `${speed}ms` }"-->
    <!--        >-->
    <!--            <slot />-->
    <!--        </div>-->
    <!--    </aside>-->
    <transition
        enter-class="opacity-0"
        enter-active-class="ease-out transition-medium"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-active-class="ease-out transition-medium"
        leave-to-class="opacity-0"
    >
        <div
            v-show="isOpen"
            class="z-10 fixed inset-0 transition-opacity select-none"
            @keydown.esc="onClickOutsideHandler"
        >
            <div
                class="fixed h-screen inset-0 bg-black opacity-50"
                tabindex="0"
            />
        </div>
    </transition>
    <aside
        ref="drawer"
        class="w-full h-screen transform top-0 left-0 w-64 bg-white dark:bg-gray-900 fixed overflow-auto ease-in-out transition-all duration-300 z-30 p-4"
        :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
        :style="{ maxWidth: maxWidth, transitionDuration: `${speed}ms` }"
    >
        <slot />
    </aside>
</template>

<style scoped lang="scss">
@import '@/@core/scss/base/_mixins.scss';

.aside {
    &__overlay {
        @apply fixed top-0 right-0 bottom-0 left-0 w-full h-screen select-none;
        z-index: 100;
        opacity: 0;
        transition-property: opacity;
        background-color: #000000;
    }

    &__content {
        @include glassMorphism(#f0f4f8);
        @apply fixed
        w-full
        top-0
        right-0
        bottom-0
        h-screen
        p-4
        bg-white
        dark:bg-gray-900
        overflow-auto
        border-l
        border-gray-100
        dark:border-gray-700
        dark:shadow-gray-600
        overflow-y-auto;
        z-index: 200;
        transition-property: transform;
        transform: translateX(100%);
    }
    &.open {
        .aside__overlay {
            opacity: 0.7;
        }
        .aside__content {
            //@apply fixed;
            transform: translateX(0);
        }
    }
}
</style>
