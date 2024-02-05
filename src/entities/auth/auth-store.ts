import { defineStore, storeToRefs } from 'pinia'
import { AuthModel, ResponseModel, useApiStore, UserModel } from '@/entities'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

/**
 * * Стор для управления аутентификацией
 */
export const useAuthStore = defineStore('auth-store', {
  state: () => {
    /**
     * * Маршруты
     */
    const router = useRouter()
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
            setUser(
              new UserModel({
                Name: response?.data?.name,
                Image: response?.data?.avatarUrl,
                Token: response?.data?.token,
              })
            )
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
            setUser(
              new UserModel({
                Name: response?.data?.name,
                Image: response?.data?.avatarUrl,
                Token: response?.data?.token,
              })
            )
            resolve(new ResponseModel({ Value: user.value }))
          })
          .catch((error) => {
            console.log(error)
            resolve(new ResponseModel({ IsSuccess: false }))
          })
      })

    /**
     * * Выйти из аккаунта
     */
    const leaveAccount = () => setUser(undefined)

    /**
     * * Установка текущего пользователя
     */
    const setUser = (_user: UserModel) => {
      user.value = _user

      if (_user?.Token) {
        setTokenCookie(_user.Token, 3)
        router.push({ name: 'main' })
      } else {
        deleteTokenCookie()
        router.push({ name: 'sign-in' })
      }
    }

    /**
     * * Подставить Token куку
     */
    const setTokenCookie = (token: string, expirationDays: number) => {
      const date = new Date()
      date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000)
      const expires = 'expires=' + date.toUTCString()
      document.cookie = `Token=${token}; ${expires}; path=/`
    }
    /**
     * * Удалить токен куку
     */
    const deleteTokenCookie = () => {
      document.cookie = 'Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    }

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
       * * Выйти из аккаунта
       */
      leaveAccount,
      /**
       * * Данные о текущем пользователе
       */
      user,
    }
  },
  persist: true,
})
