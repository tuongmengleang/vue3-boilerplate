<template>
    <Navbar />
    <main class="h-full flex-1">
        <RouterView />
    </main>
</template>

<script setup lang="ts">
/* IMPORTS */
import Navbar from './components/Navbar.vue'
</script>

<style scoped lang="scss"></style>
