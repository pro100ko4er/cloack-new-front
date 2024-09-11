"use client"

import axios from 'axios'

 
const api = () => {
    const baseURL = 'http://79.110.52.191/api'
    const $api = axios.create({
        withCredentials: true,
        baseURL
    })
    let token = null
    if(typeof window !== 'undefined') {
    token = localStorage.getItem('token')
    }
    
    $api.interceptors.request.use(config => {
        config.headers.Authorization = token
        return config
    })

    $api.interceptors.response.use(config => {
        return config
    }, async error => {
        console.log(error)
        const originalRequest = error.config
        if(error.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true
            // localStorage.removeItem('token')
        }
        throw error
    })

    return $api
}


export default api()