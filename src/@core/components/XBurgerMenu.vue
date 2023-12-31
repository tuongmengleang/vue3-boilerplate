<script setup lang="ts">
/* IMPORTS */

/* PROPS */
const props = defineProps<{
    isX?: boolean
}>()

/* EMIT */
const $emit = defineEmits([ 'onToggle' ])

/* METHODS */
const onClick = (): void => {
    $emit('onToggle', props.isX)
}
</script>

<template>
    <button
        v-if="false"
        id="burger"
        :class="{ active: isX }"
        type="button"
        @click.prevent="onClick"
    >
        <span />
    </button>
    <div
        id="burger-wrapper"
        :class="{ active: isX }"
        @click.prevent="onClick"
    >
        <span class="line half start" />
        <span class="line" />
        <span class="line half end" />
    </div>
</template>

<style scoped lang="scss">
#burger-wrapper {
    @apply w-[30px] h-[30px] flex flex-col justify-between cursor-pointer transition-all duration-300 ease-out;

    .line {
        @apply bg-green-500 dark:bg-white rounded w-full h-[5px];

        &.half {
            @apply w-1/2;
        }
        &.start {
            transition: transform 330ms cubic-bezier(0.54, -0.81, 0.57, 0.57);
            transform-origin: right;
        }
        &.end {
            align-self: flex-end;
            transition: transform 330ms cubic-bezier(0.54, -0.81, 0.57, 0.57);
            transform-origin: left;
        }
    }

    &.active {
        //@apply -rotate-45;
        transform: rotate(-45deg);

        .line.start {
            transform: rotate(-90deg) translateX(2.5px);
        }
        .line.end {
            transform: rotate(-90deg) translateX(-2.5px);
        }
    }
}

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
