/**
 * * Модель для пагинации
 */
export class PaginationModel {
  /**
   * * Номер страницы
   */
  Page: number = 0
  /**
   * * Количество элементов на странице
   */
  PageSize: number = 6

  constructor(obj?: Partial<PaginationModel>) {
    if (obj) Object.assign(this, obj)
  }
}
