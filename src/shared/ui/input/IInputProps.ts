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
}
