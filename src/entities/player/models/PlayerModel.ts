import { GeneralModel } from '@/entities'

/**
 * * Модель игрока
 */
export class PlayerModel extends GeneralModel {
  /**
   * * Позиция
   */
  Position?: string
  /**
   * * Команда
   */
  Team?: number
  /**
   * * Рост
   */
  Height?: number
  /**
   * * Вес
   */
  Weight?: number
  /**
   * * Номер игрока
   */
  Number?: number
  /**
   * * Дата рождения
   */
  Birthday?: string

  /**
   * * Возраст
   */
  get Age() {
    if (this.Birthday) {
      const _birth = new Date(this.Birthday)
      const _current = new Date()
      return _current?.getFullYear() - _birth?.getFullYear()
    }
  }

  constructor(obj?: Partial<PlayerModel>) {
    super()
    if (obj) Object.assign(this, obj)
  }
}
