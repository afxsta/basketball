import { PaginationModel } from '@/entities'

/**
 * * Модель для составления API запросов
 */
export class FilterModel {
  /**
   * * Имя игрока
   */
  Name?: string
  /**
   * * Id команд
   */
  TeamIds?: number[]
  /**
   * * Пагинация
   */
  Pagination?: PaginationModel

  constructor(obj?: Partial<FilterModel>) {
    if (obj) Object.assign(this, obj)
  }
}
