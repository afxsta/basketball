import { defineStore, storeToRefs } from 'pinia'
import { ResponseModel, useApiStore, UserModel } from '@/entities'
import { ref } from 'vue'

/**
 * * Стор для управления аутентификацией
 */
export const useAuthStore = defineStore('auth-store', {
  state: () => {
    /**
     * * Стор для использования API
     */
    const { api } = storeToRefs(useApiStore())

    /**
     * * Путь к API авторизации
     */
    const authPath = '/api/Auth/'

    /**
     * * Данные о текущем пользователе
     */
    const user = ref<UserModel>()

    /**
     * * Запрос на вход в аккаунт
     * @param login Логин
     * @param password Пароль
     */
    const signIn = async (login: string, password: string) =>
      new Promise<ResponseModel<UserModel>>(async (resolve) => {
        const request = { login, password }

        await api.value
          .post(`${authPath}SignIn`, request)
          .then((response) => {
            user.value = new UserModel({
              Name: response?.data?.name,
              Image: response?.data?.avatarUrl,
              Token: response?.data?.token,
            })
            resolve(new ResponseModel({ Value: user.value }))
          })
          .catch((error) => {
            console.log(error)
            resolve(new ResponseModel({ IsSuccess: false }))
          })
      })

    return {
      /**
       * * Запрос на вход в аккаунт
       * @param login Логин
       * @param password Пароль
       */
      signIn,
      /**
       * * Данные о текущем пользователе
       */
      user,
    }
  },
  persist: true,
})
