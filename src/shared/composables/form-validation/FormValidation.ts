import { ValidationModel } from '@/shared'
import { computed, ref } from 'vue'

export function useFormValidation() {
  /**
   * * Настройки валидации
   */
  const options = ref<ValidationModel[]>()
  /**
   * * Началась ли валидация
   */
  const isStarted = ref(false)
  /**
   * * Время показа ошибок
   */
  const validationTimer = ref()

  /**
   * * Валидация полей
   */
  const validation = computed(() => {
    const model: any = {}

    options.value?.forEach((o) => {
      model[o.Key] = !o.Condition(o.Value) && isStarted.value ? o.Error : ''
    })

    return model
  })

  /**
   * * Проверка boolean значения
   */
  const checkAsBoolean = (_value: any) => !!_value
  /**
   * * Проверка значения меньше нуля
   */
  const checkPositiveNumber = (_value: number) => _value > 0
  /**
   * * Проверить наличие ошибок
   */
  const startValidate = (_options: ValidationModel[]) => {
    options.value = _options
    clearTimeout(validationTimer.value)

    isStarted.value = true
    validationTimer.value = setTimeout(() => (isStarted.value = false), 3000)

    return Object.values(validation.value).every((v) => !v)
  }

  return {
    validation,
    checkAsBoolean,
    checkPositiveNumber,
    startValidate,
  }
}
