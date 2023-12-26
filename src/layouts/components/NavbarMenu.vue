<script setup lang="ts">
/* PROPS */
withDefaults(
    defineProps<{
        items: { routeName: string; title: string }[]
        mode?: string
    }>(),
    {
        mode: 'vertical'
    }
)
</script>

<template>
    <ul :class="['navbar-menu', mode === 'horizontal' ? 'horizontal' : '']">
        <li
            v-for="(item, index) in items"
            :key="index"
            class="text-gray-500 dark:text-gray-400 hover:text-gray-950 hover:font-medium dark:hover:text-white"
        >
            <RouterLink
                :to="{ name: item.routeName }"
                class="block px-2 py-1 rounded-xl"
            >
                {{ item.title }}
            </RouterLink>
        </li>
    </ul>
</template>

<style scoped lang="scss">
.router-link-active {
    @apply bg-gradient-to-r
  from-yellow-200
  via-green-200
  to-green-500
  text-gray-950;
}

.navbar-menu {
    @apply hidden md:flex relative items-center gap-10 text-sm font-medium;

    &.horizontal {
        @apply flex flex-col gap-y-3;

        li {
            @apply w-full;

            a {
                @apply px-3 py-2;
            }
        }
    }
}
</style>
