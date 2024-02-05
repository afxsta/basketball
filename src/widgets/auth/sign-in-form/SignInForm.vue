<script lang="ts" setup>
import { Input, Button, ValidationModel } from '@/shared'
import { computed, ref } from 'vue'
import { useAuthStore, AuthModel } from '@/entities/auth'
import { useFormValidation, ErrorMessage } from '@/shared'

/**
 * * Стор для использования API авторизации
 */
const { signIn } = useAuthStore()

/**
 * * Логин
 */
const login = ref('')
/**
 * * Пароль
 */
const password = ref('')
/**
 * * Использование валидации
 */
const { validation, checkAsBoolean, startValidate } = useFormValidation()
/**
 * * Показывать ошибку авторизции
 */
const showWrongPasswordError = ref(false)
/**
 * * Таймер отображения ошибки
 */
const errorTimer = ref()

/**
 * * Настройки валидации
 */
const validationOptions = computed(() => [
  new ValidationModel({
    Key: 'Login',
    Error: 'Field available',
    Value: login.value,
    Condition: checkAsBoolean,
  }),
  new ValidationModel({
    Key: 'Password',
    Error: 'Field available',
    Value: password.value,
    Condition: checkAsBoolean,
  }),
])

/**
 * * Отправка запроса на вход в аккаунт
 */
const trySignIn = async () => {
  if (startValidate(validationOptions.value)) {
    const response = await signIn(
      new AuthModel({
        Login: login.value,
        Password: password.value,
      })
    )
    if (!response.IsSuccess) {
      showWrongPasswordError.value = true
      clearTimeout(errorTimer.value)
      errorTimer.value = setTimeout(
        () => (showWrongPasswordError.value = false),
        3000
      )
    }
  }
}
</script>
<template>
  <div class="sign-in">
    <Input
      v-model="login"
      label="Login"
      :error="validation.Login"
    />
    <ErrorMessage message-static>
      <Input
        v-model="password"
        label="Password"
        type="password"
        :error="validation.Password"
      />
      <template #error>
        <span
          v-if="showWrongPasswordError"
          class="sign-in_error"
          >Wrong password. Please, try again.</span
        >
      </template>
    </ErrorMessage>
    <Button @click="trySignIn"> Sign In </Button>
  </div>
</template>
<style lang="scss">
.sign-in {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  width: 100%;
  max-width: 366px;
  &_error {
    margin-bottom: 24px;
  }
}
</style>
