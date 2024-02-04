/**
 * * Модель получения API ответа
 */
export class ResponseModel<T> {
  /**
   * * Результат запроса
   */
  Value?: T
  /**
   * * Запрос прошел успешно
   */
  IsSuccess?: boolean = true
  /**
   * * Код ошибки
   */
  ErrorCode?: number

  constructor(obj?: Partial<ResponseModel<T>>) {
    if (obj) Object.assign(this, obj)
  }
}
