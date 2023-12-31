<script lang="ts" setup>
/* IMPORTS */
import { useCounterStore } from '@/store/counter'

/* STATES */
const counterStore = useCounterStore()
</script>

<template>
    <div class="container">
        <h1 class="py-10 text-4xl title">
            {{ $t('store_page.store_testing') }}
        </h1>
        <section id="counter">
            <span class="text-gray-700 dark:text-gray-300">
                {{ $t('store_page.counter') }}:
                <strong v-text="counterStore.counter" />
            </span>
            <div class="flex flex-col md:flex-row gap-2 pt-4">
                <button
                    type="button"
                    class="x-btn"
                    @click="counterStore.onIncrement()"
                >
                    {{ $t('store_page.increment') }}
                </button>
                <button
                    type="button"
                    class="x-btn"
                    @click="counterStore.onIncrement2x()"
                >
                    {{ $t('store_page.increment') }}2x
                </button>
                <button
                    type="button"
                    class="x-btn"
                    @click="counterStore.onDecrement()"
                >
                    {{ $t('store_page.decrement') }}
                </button>
                <button
                    type="button"
                    class="x-btn"
                    @click="counterStore.counter = 0"
                >
                    {{ $t('store_page.reset') }}
                </button>
            </div>
        </section>
        <section
            id="form"
            class="pt-5"
        >
            <span class="text-gray-700 dark:text-gray-300">
                {{ $t('store_page.full_name') }}:
                <strong>{{
                    counterStore.first_name + ' ' + counterStore.last_name
                }}</strong></span>
            <form class="flex flex-col md:flex-row items-center gap-4 pt-3">
                <div class="w-full md:w-1/4">
                    <label
                        for="first_name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        {{ $t('store_page.first_name') }}:
                    </label>
                    <input
                        id="first_name"
                        v-model="counterStore.first_name"
                        type="text"
                        class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Mengleang"
                        required
                    >
                </div>
                <div class="w-full md:w-1/4">
                    <label
                        for="first_name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        {{ $t('store_page.last_name') }}:
                    </label>
                    <input
                        id="last_name"
                        v-model="counterStore.last_name"
                        type="text"
                        class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Tuong"
                        required
                    >
                </div>
                <button
                    type="button"
                    class="x-btn w-full md:w-20 self-end"
                    @click="counterStore.onResetFullName()"
                >
                    Reset
                </button>
            </form>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.x-btn {
    @apply py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700;
}
</style>
