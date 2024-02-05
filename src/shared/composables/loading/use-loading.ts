import { ref } from 'vue'

/**
 * * Управление загрузкой
 */
export function useLoading() {
  /**
   * * Идет загрузка
   */
  const isLoading = ref(false)

  /**
   * * Начать загрузку
   */
  const startLoading = () => (isLoading.value = true)
  /**
   * * Остановить загрузки
   */
  const stopLoading = () => (isLoading.value = false)

  return { isLoading, startLoading, stopLoading }
}
