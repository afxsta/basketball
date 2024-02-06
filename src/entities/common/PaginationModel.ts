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
  /**
   * * Максимальное количество сущностей
   */
  Count: number = 0
  /**
   * * Максимальное кол-во страниц
   */
  get Total() {
    return Math.ceil(Number(this.Count) / Number(this.PageSize))
  }
  /**
   * * Индекс первого элемента
   */
  get StartIndex() {
    return (this.Page - 1) * this.PageSize
  }
  /**
   * * Индекс последнего элемента
   */
  get EndIndex() {
    return this.StartIndex + this.PageSize
  }
  /**
   * * Параметры для запроса
   */
  get Query() {
    return { page: this.Page, size: this.PageSize }
  }

  constructor(obj?: Partial<PaginationModel>) {
    if (obj) Object.assign(this, obj)
  }
}
