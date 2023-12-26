<script setup lang="ts">
/* IMPORTS */

/* PROPS */
const props = defineProps<{
    isX?: boolean
}>()

/* EMIT */
const $emit = defineEmits(['onToggle'])

/* METHODS */
const onClick = (): void => {
    $emit('onToggle', props.isX)
}
</script>

<template>
    <button
        id="burger"
        :class="{ active: isX }"
        type="button"
        @click.prevent="onClick"
    >
        <span />
    </button>
</template>

<style scoped lang="scss">
#burger {
    @apply relative ml-auto;

    span,
    span::before,
    span::after {
        @apply absolute block bg-green-500 h-[3px] rounded;
        transition: 0.3s ease-in-out;
    }

    span::before,
    span::after {
        content: '';
    }

    span {
        @apply top-0 right-0 w-[20px];
    }

    span::before {
        @apply left-0 -top-2 w-[16px];
    }

    span::after {
        @apply left-0 top-2 w-[27px];
    }

    &.active {
        span {
            @apply -rotate-45 top-0 w-[27px];
        }
        span::before {
            @apply rotate-90 top-0 w-[27px];
        }
        span::after {
            @apply top-0 left-0 rotate-90 opacity-0 w-0;
        }
    }
}
</style>
