<script lang="ts" setup>
import axios from '@axios'
import { ref } from 'vue'
import { AxiosResponse } from 'axios'
import MovieCard from './components/MovieCard.vue'
import { useInfiniteScroll, useSessionStorage } from '@vueuse/core'
import { ROUTE_NAMES } from '@/router/name.enum'
// import { IMovie } from '@/types/IMovie'

const movies: any = useSessionStorage('movies', [])
const page = useSessionStorage('movie_page', 1)
const loading = ref<boolean>(false)

/* METHODS */
const onFetching = async () => {
    try {
        loading.value = true
        const response: AxiosResponse = await axios.get('movie/popular', {
            params: { page: page.value, limit: 5 }
        })
        if (response.data.results?.length) {
            movies.value.push(...response.data.results)
            page.value++
        }
        loading.value = false
    } catch (error) {
        console.error(error)
    }
}

useInfiniteScroll(document, () => onFetching(), { distance: 10 })
</script>

<template>
    <keep-alive>
        <ul
            class="container mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6"
        >
            <li
                v-for="(item, key) in movies"
                :key="key"
            >
                <RouterLink
                    :to="{
                        name: ROUTE_NAMES.POST_DETAIL,
                        params: { id: item.id }
                    }"
                >
                    <MovieCard
                        :poster="item?.poster_path"
                        :title="item?.title"
                        :subtitle="item?.overview"
                        :vote="item?.vote_average"
                    />
                </RouterLink>
            </li>
            <li v-if="loading">
                <MovieCard loading />
            </li>
        </ul>
    </keep-alive>
</template>
