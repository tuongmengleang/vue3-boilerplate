import axios from 'axios'

const axiosIns = axios.create({
    // You can add your headers here
    // ================================
    baseURL: import.meta.env.VITE_API_URL,
    params: {
        api_key: import.meta.env.VITE_API_KEY
    }
})

export default axiosIns
