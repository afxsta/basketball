import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {
  ErrorEnum,
  UserModel,
  useAuthStore,
  useNotificationStore,
} from '@/entities'

/**
 * * Стор для отправки API запросов
 */
export const useApiStore = defineStore('api-store', () => {
  /**
   * * Ссылка на API
   */
  const apiUrl = ref('http://dev.trainee.dex-it.ru')
  /**
   * * Стор уведомлений
   */
  const { sendNotification } = useNotificationStore()
  /**
   * * Стор текущего пользователя
   */
  const { leaveAccount } = useAuthStore()

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
        const errorCode = e?.response?.status

        console.log(errorCode)
        if (!errorCode) {
          leaveAccount()
          return
        }

        const errorMessage = getMessageError(errorCode)
        sendNotification(errorMessage)

        return Promise.reject(errorMessage)
      }
    )

    return apiInstance
  })

  /**
   * * Получение текста ошибки
   * @param _error Id ошибки
   */
  const getMessageError = (_error: number) => {
    switch (_error) {
      case ErrorEnum.BadRequest:
        return 'Bad request sent'
      case ErrorEnum.Unauthorized:
        return 'Authorization Error'
      case ErrorEnum.Conflict:
        return 'Conflict when creating an entity'
    }
  }

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
