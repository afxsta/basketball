import { GeneralModel } from '@/entities/common'

/**
 * * Модель для представления текущего пользователя
 */
export class UserModel extends GeneralModel {
  /**
   * * Токен текущего пользователя
   */
  Token?: string

  constructor(obj?: Partial<UserModel>) {
    super()
    if (obj) Object.assign(this, obj)
  }
}
