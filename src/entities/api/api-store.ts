import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { ErrorEnum, UserModel } from '@/entities'

/**
 * * Стор для отправки API запросов
 */
export const useApiStore = defineStore('api-store', () => {
  /**
   * * Ссылка на API
   */
  const apiUrl = ref('http://dev.trainee.dex-it.ru')

  /**
   * * Настроенное поле для отправки API запросов
   */
  const api = computed(() => {
    const origin = { 'Access-Control-Allow-Origin': '*' }

    const apiInstance = axios.create({
      baseURL: apiUrl.value,
      headers: {
        ...origin,
        options: origin,
      },
    })

    apiInstance.interceptors.request.use(
      async (config) => {
        let user
        const storage = localStorage.getItem('auth-store')
        if (storage) {
          user = new UserModel(JSON.parse(storage)?.user)
        }

        if (user) {
          config.headers.Authorization = `Bearer ${user.Token}`
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
        // if (!e.response?.status) {
        //   localStorage.removeItem('user')
        //   location.href = '/'
        //   return
        // }

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
    /**
     * * Ссылка на API
     */
    apiUrl,
    /**
     * * Настроенное поле для отправки API запросов
     */
    api,
  }
})
