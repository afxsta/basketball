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
      const formData = new FormData()
      formData.append('file', file)

      await api.value
        .post(`${mediaApiPath}SaveImage`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
          resolve(new ResponseModel({ Value: response.data }))
        })
        .catch((error) => {
          console.error(error)
          resolve(new ResponseModel({ IsSuccess: false }))
        })
    })

  /**
   * * Запрос на удаление изображения
   * @param fileName Имя файла изображения
   * @returns Результат удаления
   */
  const deleteImage = (fileName: string) =>
    new Promise<ResponseModel<boolean>>(async (resolve) => {
      await api.value
        .delete(`${mediaApiPath}DeleteImage`, { params: { fileName } })
        .then((response) => {
          resolve(new ResponseModel({ Value: response.data }))
        })
        .catch((error) => {
          console.error(error)
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
    /**
     * * Запрос на удаление изображения
     * @param fileName Имя файла изображения
     * @returns Результат удаления
     */
    deleteImage,
  }
})
