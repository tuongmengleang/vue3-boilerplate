<script setup lang="ts">
/* IMPORTS */
import { onMounted } from 'vue'
import { isMobile } from '@core/composables/use-x-screen'

onMounted(() => {
    const text = document.getElementById('text')
    let shadow = ''

    const heightShadow = isMobile() ? 8 : 24
    for (let i = 0; i < heightShadow; i++) {
        shadow += (shadow ? ',' : '') + -i * 1 + 'px ' + i * 1 + 'px 0 #d9d9d9'
    }

    text.style.textShadow = shadow
})
</script>

<template>
    <div id="wrapper">
        <div
            id="text"
            data-text="Vue 3 Starter Boilerplate"
        >
            Vue 3 Starter Boilerplate
        </div>
    </div>
</template>

<style scoped lang="scss">
#wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 68px);
    overflow: hidden;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 10s ease infinite;

    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    #text {
        position: relative;
        color: #fff;
        font-size: 12vw;
        line-height: 0.9em;
        letter-spacing: 2px;
        text-align: center;
        transform: rotate(-28deg) skew(25deg);

        &:before {
            content: attr(data-text);
            position: absolute;
            top: 30px;
            left: -30px;
            color: rgba(0, 0, 0, 0.3);
            text-shadow: none;
            filter: blur(5px);
            z-index: -1;
        }
    }
}
</style>
