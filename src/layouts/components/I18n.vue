<script lang="ts" setup>
/* IMPORTS */
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n({ useScope: 'global' })
import type { I18nLanguage } from '@/layouts/types'

/* STATES */
const target = ref<HTMLElement | null>(null)
const isOpen = ref<boolean>(false)
const languages = computed<I18nLanguage[]>(() => [
    { icon: 'emojione:flag-for-cambodia', label: 'Khmer', i18nLang: 'kh' },
    { icon: 'circle-flags:uk', label: 'English', i18nLang: 'en' },
    { icon: 'emojione:flag-for-france', label: 'Français', i18nLang: 'fr' },
    { icon: 'emojione:flag-for-china', label: '中国', i18nLang: 'ch' }
])

const activeI18n = computed(() =>
    languages.value.find((item: I18nLanguage) => item.i18nLang === locale.value)
)

const onChangeI18n = (i18n: string): void => {
    locale.value = i18n
    isOpen.value = false
}

onClickOutside(target, () => (isOpen.value = false))
</script>

<template>
    <div class="language-switcher">
        <button
            v-if="activeI18n"
            type="button"
            class="language-switcher__btn"
            :class="{ active: isOpen }"
            @click="isOpen = !isOpen"
        >
            <XIcon
                :icon="activeI18n.icon"
                class="text-xl"
            />
            <span>{{ activeI18n.label }}</span>
            <XIcon
                icon="ic:round-keyboard-arrow-down"
                class="text-lg"
                :class="[
                    'text-lg transition-all duration-300',
                    isOpen ? 'rotate-180' : ''
                ]"
            />
        </button>

        <Transition
            enter-active-class="transition ease-out duration-300"
            enter-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
        >
            <div
                v-if="isOpen"
                ref="target"
                class="language-switcher__content origin-top-right"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
            >
                <ul>
                    <li
                        v-for="(language, i) in languages"
                        :key="i"
                        :class="{ active: language.i18nLang === locale }"
                        @click="onChangeI18n(language.i18nLang)"
                    >
                        <XIcon
                            :icon="language.icon"
                            class="text-2xl"
                        />
                        <span>{{ language.label }}</span>
                    </li>
                </ul>
            </div>
        </Transition>
    </div>
</template>

<style lang="scss" scoped>
.language-switcher {
    @apply relative;
    &__btn {
        @apply flex items-center gap-2 p-2 rounded-3xl bg-white shadow border
        text-sm uppercase font-medium dark:text-gray-200 dark:bg-gray-900
        dark:border-gray-700 dark:shadow-gray-700;

        &.active {
            @apply outline outline-gray-300 dark:outline-gray-500 outline-offset-2 outline-2;
        }
    }

    &__content {
        @apply absolute top-11 right-0 w-40 p-2 bg-white dark:bg-gray-900 shadow
        border rounded-xl dark:border-gray-700 dark:shadow-gray-700;

        ul {
            @apply flex flex-col;
            li {
                @apply relative flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200
                dark:hover:bg-gray-700 cursor-pointer uppercase font-medium
                dark:text-gray-200;

                &.active {
                    @apply border-2 bg-green-50 border-green-400 dark:bg-green-700 dark:border-green-500;
                }
            }
        }
    }
}
</style>
