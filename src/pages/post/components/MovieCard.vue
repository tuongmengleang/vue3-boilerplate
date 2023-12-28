<script setup lang="ts">
/* IMPORTS */
import { computed } from 'vue'

/* PROPS */
const props = defineProps<{
    poster?: string
    title?: string
    subtitle?: string
    vote?: number
    loading?: boolean
}>()

/* STATES */
const url = computed(
    () => `${import.meta.env.VITE_FILE_URL}/original/${props.poster}`
)
</script>

<template>
    <div
        v-if="!loading"
        class="w-full relative"
    >
        <div
            class="w-full max-h-[280px] rounded-xl overflow-hidden cursor-pointer"
        >
            <img
                v-lazy="url"
                src=""
                class="w-full max-h-full object-cover object-center"
                :alt="title"
            >
        </div>
        <div class="py-3">
            <h6
                class="text-base text-gray-700 dark:text-gray-200 font-semibold"
            >
                {{ title }}
            </h6>
            <p
                class="block w-full text-sm text-gray-500 dark:text-gray-400 truncate"
            >
                {{ subtitle }}
            </p>
        </div>

        <span
            class="absolute top-3 right-3 w-10 h-10 grid place-items-center rounded-full bg-gradient-to-b from-orange-500 to-yellow-300 shadow-lg shadow-yellow-300 text-sm text-black font-semibold"
        >
            {{ vote?.toFixed(2) }}
        </span>
    </div>
    <div
        v-else
        class="w-full relative"
    >
        <div class="w-full h-[280px] rounded-xl overflow-hidden">
            <div class="w-full h-full object-cover object-center skeleton" />
        </div>
        <div class="py-3">
            <span class="block w-1/2 h-5 rounded-lg skeleton" />
            <span class="block w-full h-5 mt-3 rounded-lg skeleton" />
        </div>

        <span
            class="absolute top-3 right-3 w-10 h-10 rounded-full animate-pulse bg-gray-300 dark:bg-gray-800"
        />
    </div>
</template>

<style scoped lang="scss">
.skeleton {
    @apply animate-pulse bg-gray-200 dark:bg-gray-700;
}
</style>
