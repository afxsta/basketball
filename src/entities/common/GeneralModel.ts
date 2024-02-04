/**
 * * Базовая модель для представления сущности
 */
export class GeneralModel {
  /**
   * * Id сущности
   */
  Id?: number
  /**
   * * Наименование
   */
  Name?: string
  /**
   * * Изображение для аватара
   */
  Image?: string | File

  constructor(obj?: Partial<GeneralModel>) {
    if (obj) Object.assign(this, obj)
  }
}
