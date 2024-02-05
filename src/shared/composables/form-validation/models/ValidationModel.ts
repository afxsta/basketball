/**
 * * Модель для валидации форм
 */
export class ValidationModel {
  /**
   * * Имя поля
   */
  Key?: string
  /**
   * * Текст ошибки
   */
  Error?: string
  /**
   * * Значение
   */
  Value?: any
  /**
   * * Функция для проверки валидности
   */
  Condition?: Function

  constructor(obj?: Partial<ValidationModel>) {
    if (obj) Object.assign(this, obj)
  }
}
