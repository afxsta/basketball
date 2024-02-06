import { GeneralModel } from '@/entities'
import { IAvatarProps } from '@/shared'

export interface IUserInfoProps extends IAvatarProps {
  /**
   * * Информация о пользователе
   */
  info?: GeneralModel
}
