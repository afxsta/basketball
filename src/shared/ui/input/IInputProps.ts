import { InputHTMLAttributes } from 'vue'

export interface IInputProps extends /* @vue-ignore */ InputHTMLAttributes {
  /**
   * * Введенный текст
   */
  modelValue?: string | number
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
  /**
   * * Тип ввода
   */
  type?: string
  /**
   * * Текст в пустом поле
   */
  placeholder?: string
  /**
   * * Ширина поля ввода
   */
  width?: string
}
