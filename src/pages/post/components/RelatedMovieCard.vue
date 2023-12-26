<script setup lang="ts">
/* IMPORT */
import { displayFile } from '@core/composables/useFile'

/* PROPS */
defineProps<{
    thumbnail: string
    title: string
    vote: number
}>()
</script>

<template>
    <div
        class="relative w-full min-h-[250px] bg-no-repeat bg-center bg-cover bg-life-easier shadow-md shadow-gray-300 dark:shadow-gray-800 rounded-xl"
        :style="{ backgroundImage: `url(${displayFile(thumbnail)})` }"
    >
        <div
            class="absolute left-0 bottom-0 w-full p-2 bg-gray-500 bg-opacity-40 backdrop-filter backdrop-blur-sm rounded-br-lg rounded-bl-lg"
        >
            <h5
                class="w-full text-white truncate_text"
                v-text="title"
            />
        </div>
        <div
            class="absolute top-2 right-2 w-8 h-8 rounded-full bg-yellow-500 bg-opacity-40 backdrop-filter backdrop-blur-sm grid place-items-center text-xs text-white font-semibold"
        >
            {{ vote }}
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/@core/scss/base/_mixins.scss';

.truncate_text {
    @include truncated-text(100%);
}
</style>
