import { SelectOptionModel } from '../models'

export interface ISelectProps /* @vue-ignore */ {
  /**
   * * Список выбранных Id
   */
  modelValue?: number[]
  /**
   * * Список элементов
   */
  options?: SelectOptionModel[]
  /**
   * * Мульти выбор
   */
  isMulti?: boolean
  /**
   * * Заголовок
   */
  label?: string
  /**
   * * Текст ошибки
   */
  error?: string
  /**
   * * Белая тема
   */
  isWhite?: boolean
  /**
   * * Открывать список сверху
   */
  above?: boolean
}
