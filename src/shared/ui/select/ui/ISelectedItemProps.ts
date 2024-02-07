import { SelectOptionModel } from '@/shared/ui/select'

export interface ISelectedItemProps /* @vue-ignore */ {
  /**
   * * Данные о выбранном элементе
   */
  option?: SelectOptionModel
  /**
   * * Спрятать кнопку удаления
   */
  hideDelete?: boolean
}
