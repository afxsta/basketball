import { PaginationModel } from '@/entities'

/**
 * * Модель для составления API запросов
 */
export class PlayerFilterModel {
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
  Pagination: PaginationModel

  constructor(obj?: Partial<PlayerFilterModel>) {
    if (obj) Object.assign(this, obj)
  }
}
