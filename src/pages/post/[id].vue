<script setup lang="ts">
/* IMPORTS */
import axios from '@axios'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { AxiosResponse } from 'axios'
import { displayFile } from '@core/composables/useFile'
import RelatedMovieCard from '@/pages/post/components/RelatedMovieCard.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
// import swiper module styles
import 'swiper/css'
import 'swiper/css/pagination'
import { IMovie } from '@/types/IMovie'

/* INTERFACE */
interface IMovieDetails {
    id: number | null
    title: string
    backdrop_path: string
    overview: string
    poster_path: string
    vote_average: number
}

/* STATES */
const route = useRoute()
const loading = ref<boolean>(false)
const movie = ref<IMovieDetails>({
    id: null,
    title: '',
    backdrop_path: '',
    overview: '',
    poster_path: '',
    vote_average: 0
})
const relatedMovies = ref<IMovie[]>([])

// const modules = ref([ Pagination ])

/* METHODS */
async function onFetching (id: number) {
    loading.value = true
    await axios
        .get(`movie/${id}`)
        .then((resp: AxiosResponse) => (movie.value = resp.data))
        .finally(() => (loading.value = false))
}

async function onFetchRelated (id: number) {
    await axios
        .get(`movie/${id}/similar`)
        .then(
            (resp: AxiosResponse) => (relatedMovies.value = resp.data.results)
        )
}

onFetching(Number(route.params?.id))
onFetchRelated(Number(route.params?.id))
</script>

<template>
    <div class="container mt-5">
        <div
            v-if="!loading"
            class="grid grid-cols-12 gap-0 lg:gap-16"
        >
            <div class="col-span-12 md:col-span-6 xl:col-span-4">
                <img
                    class="w-full h-full shadow-md shadow-gray-400 dark:shadow-slate-600 rounded-xl"
                    :src="displayFile(movie.poster_path)"
                    :alt="movie.title"
                >
            </div>
            <div
                class="col-span-12 md:col-span-6 xl:col-span-8 mt-8 lg:mt-0 relative py-10"
            >
                <h1
                    class="text-4xl title"
                    v-text="movie.title"
                />
                <div class="flex items-center gap-1 absolute top-0 left-0">
                    <span
                        class="block text-xl text-red-500 font-semibold"
                        v-text="movie.vote_average.toFixed(2)"
                    />
                    <XIcon
                        class="text-xl text-yellow-500"
                        icon="material-symbols:star-rounded"
                    />
                </div>

                <!-- 👉🏼 Tab Header -->
                <div
                    class="border-b border-gray-200 dark:border-gray-700 pt-24"
                >
                    <ul
                        class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400"
                    >
                        <li class="me-2">
                            <a
                                href="#"
                                class="inline-flex items-center justify-center p-4 text-green-600 font-semibold border-b-2 border-green-600 rounded-t-lg active dark:text-green-500 dark:border-green-500 group"
                                aria-current="page"
                            >
                                Overview
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- 👉🏼 Tab Content -->
                <div class="pt-5">
                    <p class="text-sm subtitle">
                        {{ movie.overview }}
                    </p>
                </div>

                <!-- 👉🏼 Related Movie -->
                <section
                    v-if="relatedMovies?.length > 0"
                    class="w-full pt-20"
                >
                    <h3
                        class="text-md text-gray-700 dark:text-gray-300 font-semibold"
                    >
                        Related Movie
                    </h3>
                    <swiper
                        :pagination="{ clickable: true, enabled: true }"
                        :breakpoints="{
                            320: {
                                slidesPerView: 2,
                                spaceBetween: 20
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 20
                            },
                            1280: {
                                slidesPerView: 5,
                                spaceBetween: 30
                            }
                        }"
                        class="related-swiper mt-5"
                    >
                        <swiper-slide
                            v-for="item in relatedMovies"
                            :key="item.id"
                        >
                            <RelatedMovieCard
                                :title="item.title"
                                :vote="Number(item.vote_average.toFixed(2))"
                                :thumbnail="item.poster_path"
                                class="cursor-grabbing"
                            />
                        </swiper-slide>
                    </swiper>
                </section>
            </div>
        </div>
        <div
            v-else
            class="loader mx-auto"
        />
    </div>
</template>

<style scoped lang="scss">
.loader {
    width: 100px;
    height: 40px;
    --g: radial-gradient(
            farthest-side,
            #0000 calc(95% - 3px),
            #fff calc(100% - 3px) 98%,
            #0000 101%
        )
        no-repeat;
    background: var(--g), var(--g), var(--g);
    background-size: 30px 30px;
    animation: l9 1s infinite alternate;
}
@keyframes l9 {
    0% {
        background-position:
            0 50%,
            50% 50%,
            100% 50%;
    }
    20% {
        background-position:
            0 0,
            50% 50%,
            100% 50%;
    }
    40% {
        background-position:
            0 100%,
            50% 0,
            100% 50%;
    }
    60% {
        background-position:
            0 50%,
            50% 100%,
            100% 0;
    }
    80% {
        background-position:
            0 50%,
            50% 50%,
            100% 100%;
    }
    100% {
        background-position:
            0 50%,
            50% 50%,
            100% 50%;
    }
}
</style>
<style lang="scss">
.related-swiper {
    .swiper-wrapper {
        padding: 10px;
    }
}
</style>
