import { baseUrl } from "@/constants/apiConstants"
import axios from "axios"

const apiCaller = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    timeout: 20000
})

apiCaller.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)

apiCaller.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error)
    }
)

export default apiCaller