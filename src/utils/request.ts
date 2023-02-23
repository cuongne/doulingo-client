import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import queryString from 'query-string'

const linkRequest = (urlLink: string, sendToken = true) => {
    const request: AxiosInstance = axios.create({
        baseURL: urlLink,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    // const token = localStorage.getItem('cn247_accessToken')
    // if (token) {
    //     request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // }
    // Add a request interceptor
    // sendToken &&
    //     request.interceptors.request.use(
    //         (config: AxiosRequestConfig) => {
    //             const token = localStorage.getItem('cn247_accessToken')
    //             if (token) {
    //                 config.headers['Authorization'] = 'Bearer ' + token
    //             }
    //             return config
    //         },
    //         (error) => {
    //             Promise.reject(error)
    //         }
    //     )

    //Add a response interceptor
    return request
}

export default linkRequest
