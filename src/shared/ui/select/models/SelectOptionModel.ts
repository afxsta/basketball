/**
 * * Модель элемента списка
 */
export class SelectOptionModel {
  Id?: number
  Text?: string

  constructor(obj?: Partial<SelectOptionModel>) {
    if (obj) Object.assign(this, obj)
  }
}
