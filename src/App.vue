<script setup lang="ts">
import layouts from '@/layouts'
import { onMounted, onUnmounted } from 'vue'
// import { useRoute } from 'vue-router'
import { useCursorMove } from '@core/composables/use-cursor-move'
import { isMobile } from '@core/composables/use-x-screen'
import { isProduction } from '@/plugins/utils'

/* METHODS */
const removeCursorCircle = () => {
    const circle = document.querySelector('#cursor .circle') as HTMLElement
    circle.remove()
}

const disableContextMenu = (event: Event) => {
    event.preventDefault()
}

const disableDevToolsShortcut = (event: KeyboardEvent) => {
    // Common shortcuts for Windows and macOS
    // Detecting Option + Command + I on macOS
    if (
        (event.metaKey && event.altKey && event.key.toUpperCase() === 'DEAD') ||
        event.key.toUpperCase() === 'I'
    ) {
        event.preventDefault()
    }

    // Common shortcuts for Windows
    if (
        (event.ctrlKey &&
            event.shiftKey &&
            (event.key.toUpperCase() === 'I' ||
                event.key.toUpperCase() === 'J')) ||
        (event.ctrlKey && event.key.toUpperCase() === 'U') ||
        event.key === 'F12'
    ) {
        event.preventDefault()
    }
}

onMounted(() => {
    !isMobile() ? useCursorMove() : removeCursorCircle()

    if (isProduction()) {
        document.addEventListener('contextmenu', disableContextMenu)
        document.addEventListener('keydown', disableDevToolsShortcut)
    }
})

onUnmounted(() => {
    document.removeEventListener('contextmenu', disableContextMenu)
    document.removeEventListener('keydown', disableDevToolsShortcut)
})
</script>

<template>
    <component :is="layouts.main" />
</template>
