import { PaginationModel } from '@/entities'

export interface ICardsListProps<T> {
  /**
   * * Список элементов
   */
  items?: T[]
  /**
   * * Данные о текущей странице
   */
  pagination?: PaginationModel
  /**
   * * Идет загрузка сущностей
   */
  isLoading?: boolean
  /**
   * * Отображается список игроков
   */
  isPlayers?: boolean
}
