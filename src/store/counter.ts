import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
    state: () => ({
        counter: 0,
        first_name: 'Mengleang',
        last_name: 'Tuong'
    }),
    actions: {
        onIncrement () {
            this.counter++
        },
        onIncrement2x () {
            this.counter *= 2
        },
        onDecrement () {
            this.counter--
        },
        onResetFullName () {
            this.first_name = 'Mengleang'
            this.last_name = 'Tuong'
        }
    }
})
