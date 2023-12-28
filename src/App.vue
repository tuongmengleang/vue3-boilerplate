<script setup lang="ts">
import layouts from '@/layouts'
import { onMounted } from 'vue'
// import { useRoute } from 'vue-router'
import { useCursorMove } from '@core/composables/use-cursor-move'
import { isMobile } from '@core/composables/use-x-screen'

// const route = useRoute()

// const layout = computed(() => layouts[route.meta.layout || 'main'])

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
    <component :is="layouts.main" />
</template>
