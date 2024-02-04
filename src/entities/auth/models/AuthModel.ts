/**
 * * Модель аутентификации пользователя
 */
export class AuthModel {
  /**
   * * Имя
   */
  Name?: string
  /**
   * * Логин
   */
  Login?: string
  /**
   * * Пароль
   */
  Password?: string

  constructor(obj?: Partial<AuthModel>) {
    if (obj) Object.assign(this, obj)
  }
}
