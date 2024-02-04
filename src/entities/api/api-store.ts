import axios from 'axios'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { ErrorEnum } from './enums'

/**
 * * Стор для отправки API запросов
 */
export const useApiStore = defineStore('api-store', () => {
  /**
   * * Ссылка на API
   */
  const apiUrl = 'http://dev.trainee.dex-it.ru'

  /**
   * * Настроенное поле для отправки API запросов
   */
  const api = computed(() => {
    const origin = { 'Access-Control-Allow-Origin': '*' }

    const apiInstance = axios.create({
      baseURL: apiUrl,
      headers: {
        ...origin,
        options: origin,
      },
    })

    apiInstance.interceptors.request.use(
      async (config) => {
        const user = localStorage.getItem('user')
        if (user) {
          config.headers.Authorization = `Bearer ${
            (JSON.parse(user) as any).Token
          }`
        }
        return config
      },
      (e) => {
        Promise.reject(e)
      }
    )

    apiInstance.interceptors.response.use(
      (response) => response,
      (e) => {
        if (!e.response?.status) {
          localStorage.removeItem('user')
          location.href = '/'
          return
        }

        let errorMessage =
          ErrorEnum[e.response?.status] ??
          e.response?.data?.title ??
          e.response?.data ??
          e.message

        return Promise.reject(errorMessage)
      }
    )

    return apiInstance
  })

  return {
    api,
  }
})
