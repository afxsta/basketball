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
}
