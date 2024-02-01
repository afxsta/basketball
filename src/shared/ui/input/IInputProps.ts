import { InputHTMLAttributes } from 'vue'

export interface IInputProps extends /* @vue-ignore */ InputHTMLAttributes {
  /**
   * * Введенный текст
   */
  modelValue?: string
  /**
   * * Заголовок
   */
  label?: string
  /**
   * * Текст ошибки
   */
  error?: string
  /**
   * * Заблокировать ввод
   */
  disabled?: boolean
  /**
   * * Режим поиска
   */
  isSearch?: boolean
  /**
   * * Минимальный таймаут ввода
   */
  timeInterval?: number
}
