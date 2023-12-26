<script setup lang="ts">
import layouts from '@/layouts'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCursorMove } from '@core/composables/use-cursor-move'
import { isMobile } from '@core/composables/use-x-screen'

const route = useRoute()

const layout = computed(() => layouts[route.meta.layout || 'main'])

/* METHODS */
const removeCursorCircle = () => {
    const circle = document.querySelector('#cursor .circle') as HTMLElement
    circle.remove()
}

onMounted(() => {
    !isMobile() ? useCursorMove() : removeCursorCircle()
})
</script>

<template>
    <!--  <main class="w-full h-screen antialiased duration-300 transition-colors text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-950">-->
    <!--    <RouterView />-->
    <!--  </main>-->
    <component :is="layout" />
</template>
