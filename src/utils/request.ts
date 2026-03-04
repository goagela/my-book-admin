import axios from "axios"
import Router from "next/router"
import { message as AntdMessage } from 'antd'

export const CreateAxiosInstance = (config?: any) => {
  const instance = axios.create({
    timeout: 5000,
    ...config,
  })

  instance.interceptors.request.use(function (config) {
    return config
  },
    function (error) {
      return Promise.reject(error)
    })

  instance.interceptors.response.use(function (response) {
    return response.data
  },
    function (error) {
      if (error.response?.status === 401) {
        Router.push('/login')
      }
      AntdMessage.error(error.response?.data?.message || '服务器异常')
      return Promise.reject(error)
    })
  return instance
}
export default CreateAxiosInstance({})