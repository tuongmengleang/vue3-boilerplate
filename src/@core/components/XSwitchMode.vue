<template>
    <input
        id="toggle-mode"
        v-model="isDark"
        type="checkbox"
    >
    <label for="toggle-mode">
        <XIcon
            class="sun text-2xl"
            icon="material-symbols:sunny-rounded"
        />
        <XIcon
            class="moon text-2xl"
            icon="ri:moon-clear-line"
        />
    </label>
</template>

<script setup lang="ts">
/* IMPORTS */
import { useDark } from '@vueuse/core'

/* STATES */
const isDark = useDark()

/* METHODS */
</script>

<style scoped lang="scss">
label {
    width: 70px;
    height: 35px;
    position: relative;
    display: block;
    background: #ebebeb;
    border-radius: 200px;
    box-shadow:
        inset 0 5px 15px rgba(0, 0, 0, 0.4),
        inset 0 -5px 15px rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: 0.3s;
    &:after {
        content: '';
        width: 30px;
        height: 30px;
        position: absolute;
        top: 50%;
        left: 26%;
        transform: translate(-50%, -50%);
        background: linear-gradient(180deg, #ffcc89, #d8860b);
        border-radius: 180px;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        transition: 0.3s;
    }
    svg {
        position: absolute;
        width: 20px;
        top: 50%;
        right: 100%;
        transform: translate(0, -50%);
        z-index: 100;
        &.sun {
            left: 8px;
            fill: #fff;
            transition: 0.3s;
        }
        &.moon {
            left: 43px;
            color: #4d4d4d;
            transition: 0.3s;
        }
    }
}

input {
    width: 0;
    height: 0;
    visibility: hidden;
    &:checked + label {
        background: #242424;
        &:after {
            left: 75%;
            background: linear-gradient(180deg, #fff, #3a3a3a);
        }
        svg {
            &.sun {
                color: #7e7e7e;
            }
            &.moon {
                color: #ffffff;
            }
        }
        + .background {
            background: #242424;
        }
    }
}
</style>
