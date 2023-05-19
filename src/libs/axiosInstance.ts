import axios, { AxiosResponse } from 'axios'

const axiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BASE_API,
})

axiosInstance.interceptors.request.use(async (config: any) => {
  return config
})

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        return axiosInstance(error.response)
      } else if (error?.response?.status === 400) {
        return Promise.reject(error)
      } else {
        return Promise.reject(error)
      }
    }
  },
)

export default axiosInstance
