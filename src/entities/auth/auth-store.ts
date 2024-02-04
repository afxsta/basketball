import { defineStore, storeToRefs } from 'pinia'
import { AuthModel, ResponseModel, useApiStore, UserModel } from '@/entities'
import { onBeforeMount, ref } from 'vue'

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
     * @param data Данные для запроса
     * @returns Данные о пользователе
     */
    const signIn = async (data: AuthModel) =>
      new Promise<ResponseModel<UserModel>>(async (resolve) => {
        const request = { login: data.Login, password: data.Password }

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

    /**
     * * Запрос для регистрации нового пользователя
     * @param data Данные для запроса
     * @returns Данные о пользователе
     */
    const signUp = async (data: AuthModel) =>
      new Promise<ResponseModel<UserModel>>(async (resolve) => {
        const request = {
          userName: data.Name,
          login: data.Login,
          password: data.Password,
        }

        await api.value
          .post(`${authPath}SignUp`, request)
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

    /**
     * * Получение user из localStorage
     */
    onBeforeMount(() => {
      try {
        const _user = localStorage['auth-store']?.user
        if (_user) user.value = new UserModel(JSON.parse(_user))
      } catch (e) {
        console.error(e)
      }
    })

    return {
      /**
       * * Запрос на вход в аккаунт
       * @param data Данные для запроса
       * @returns Данные о пользователе
       */
      signIn,
      /**
       * * Запрос для регистрации нового пользователя
       * @param data Данные для запроса
       * @returns Данные о пользователе
       */
      signUp,
      /**
       * * Данные о текущем пользователе
       */
      user,
    }
  },
  persist: true,
})
