import { PaginationModel } from '@/entities'

export interface ICardsListProps<T> {
  /**
   * * Список элементов
   */
  items?: T[]
  /**
   * * Максимальное кол-во страниц
   */
  pagesCount?: number
  /**
   * * Данные о текущей странице
   */
  pagination?: PaginationModel
}
