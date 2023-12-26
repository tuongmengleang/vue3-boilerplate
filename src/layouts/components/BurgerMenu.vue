<template>
    <button
        type="button"
        :class="['burger', active ? 'active' : '']"
        @click="active = !active"
    />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref<boolean>(false)
</script>

<style lang="scss" scoped>
.transition-burger {
    transition: all 0.25ms;
}
.burger {
    @apply relative w-7 h-1 rounded bg-green;
    @extend .transition-burger;

    &::before {
        content: '';
        @apply absolute right-0 -top-2 w-7 h-1 rounded bg-green;
    }
    &::after {
        content: '';
        @apply absolute right-0 top-2 w-7 h-1 rounded bg-green;
    }

    &.active {
        @apply bg-transparent;
        transition: all 0.15ms;

        &::before {
            @extend .transition-burger;
            @apply top-0 -rotate-45;
        }
        &::after {
            @extend .transition-burger;
            @apply top-0 rotate-45;
        }
    }
}
</style>
