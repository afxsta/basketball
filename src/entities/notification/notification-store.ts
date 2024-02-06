import { defineStore } from 'pinia'
import { ref } from 'vue'
import { NotificationModel } from '@/entities'

/**
 * * Стор для управления уведомлениями
 */
export const useNotificationStore = defineStore('notification-store', () => {
  /**
   * * Список уведомлений
   */
  const notifications = ref<NotificationModel[]>([])

  /**
   * * Отправка уведомления
   * @param text Текст
   * @param life Время жизни
   */
  const sendNotification = (_text: string, _life: number = 5000) => {
    const id = new Date().getTime()

    notifications.value.push(
      new NotificationModel({
        Id: id,
        Text: _text,
      })
    )

    setTimeout(() => {
      notifications.value = notifications.value.filter((n) => n.Id != id)
    }, _life)
  }

  return {
    /**
     * *  Список уведомлений
     */
    notifications,
    /**
     * * Отправка уведомления
     * @param text Текст
     * @param life Время жизни
     */
    sendNotification,
  }
})
