/**
 * * Модель уведомления
 */
export class NotificationModel {
  /**
   * * Id уведомления
   */
  Id?: number
  /**
   * * Текст уведомления
   */
  Text?: string

  constructor(obj?: Partial<NotificationModel>) {
    if (obj) Object.assign(this, obj)
  }
}
