<script lang="ts" setup>
import {
  Input,
  Button,
  Checkbox,
  useFormValidation,
  ValidationModel,
} from '@/shared'
import { computed, ref } from 'vue'
import { AuthModel, useAuthStore } from '@/entities'

/**
 * * Стор для использования API авторизации
 */
const { signUp } = useAuthStore()

/**
 * * Имя пользователя
 */
const name = ref('')
/**
 * * Логин
 */
const login = ref('')
/**
 * * Пароль
 */
const password = ref('')
/**
 * * Повторение пароля
 */
const passwordRepeat = ref('')
/**
 * * Принято ли соглашение
 */
const agreementAccepted = ref(false)
/**
 * * Использование валидации
 */
const { validation, checkAsBoolean, startValidate } = useFormValidation()

const checkPasswordsValidation = (_password: string) => {
  return checkAsBoolean(_password) && password.value == passwordRepeat.value
}

/**
 * * Настройки валидации
 */
const validationOptions = computed(() => [
  new ValidationModel({
    Key: 'Name',
    Error: 'Field available',
    Value: name.value,
    Condition: checkAsBoolean,
  }),
  new ValidationModel({
    Key: 'Login',
    Error: 'Field available',
    Value: login.value,
    Condition: checkAsBoolean,
  }),
  new ValidationModel({
    Key: 'Password',
    Error: 'Comparison error',
    Value: password.value,
    Condition: checkPasswordsValidation,
  }),
  new ValidationModel({
    Key: 'PasswordRepeat',
    Error: 'Comparison error',
    Value: password.value,
    Condition: checkPasswordsValidation,
  }),
  new ValidationModel({
    Key: 'Agreement',
    Error: 'You need to accept the agreement',
    Value: agreementAccepted.value,
    Condition: checkAsBoolean,
  }),
])

/**
 * * Отправка запроса на вход в аккаунт
 */
const trySignUp = async () => {
  if (startValidate(validationOptions.value)) {
    const response = await signUp(
      new AuthModel({
        Name: name.value,
        Login: login.value,
        Password: password.value,
      })
    )
  }
}
</script>
<template>
  <div class="sign-up">
    <Input
      v-model="name"
      label="Name"
      :error="validation.Name"
    />
    <Input
      v-model="login"
      label="Login"
      :error="validation.Login"
    />
    <Input
      v-model="password"
      label="Password"
      type="password"
      :error="validation.Password"
    />
    <Input
      v-model="passwordRepeat"
      label="Enter your password again"
      type="password"
      :error="validation.PasswordRepeat"
    />
    <Checkbox
      v-model="agreementAccepted"
      :error="validation.Agreement"
    >
      I accept the agreement
    </Checkbox>
    <Button @click="trySignUp"> Sign Up </Button>
  </div>
</template>
<style lang="scss">
.sign-up {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  width: 100%;
  max-width: 366px;
}
</style>
