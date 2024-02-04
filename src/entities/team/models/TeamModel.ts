import { GeneralModel } from '@/entities'

/**
 * * Модель команды
 */
export class TeamModel extends GeneralModel {
  /**
   * * Год основания
   */
  FoundationYear?: number
  /**
   * * Дивизион
   */
  Division?: string
  /**
   * * Конференц команда
   */
  Conference?: string

  constructor(obj?: Partial<TeamModel>) {
    super()
    if (obj) Object.assign(this, obj)
  }
}
