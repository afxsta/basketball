import { defineStore, storeToRefs } from 'pinia'
import { ResponseModel, useApiStore } from '@/entities'

/**
 * * Стор для управления загрузками изображений
 */
export const useMediaStore = defineStore('media-store', () => {
  /**
   * * Путь к медиа API
   */
  const mediaApiPath = '/api/Image/'
  /**
   * * Стор для использования API
   */
  const { api, apiUrl } = storeToRefs(useApiStore())

  /**
   * * Запрос на сохранение изображения
   * @param file Файл изображения
   * @returns Ссылка на изображение
   */
  const saveImage = (file: File) =>
    new Promise<ResponseModel<string>>(async (resolve) => {
      await api.value
        .get(`${mediaApiPath}GetPositions`, { params: { file } })
        .then((response) => {
          console.log(response)
          resolve(new ResponseModel({ Value: response.data }))
        })
        .catch((error) => {
          console.log(error)
          resolve(new ResponseModel({ IsSuccess: false }))
        })
    })

  return {
    /**
     * * Запрос на сохранение изображения
     * @param file Файл изображения
     * @returns Ссылка на изображение
     */
    saveImage,
  }
})
