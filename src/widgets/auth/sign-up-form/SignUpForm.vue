<script lang="ts" setup>
import { Input, Button, Checkbox } from '@/shared'
import { ref } from 'vue'
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
 * * Отправка запроса на вход в аккаунт
 */
const trySignUp = async () => {
  const response = await signUp(
    new AuthModel({
      Name: name.value,
      Login: login.value,
      Password: password.value,
    })
  )
  console.log(response)
}
</script>
<template>
  <div class="sign-up">
    <Input
      v-model="name"
      label="Name"
    />
    <Input
      v-model="login"
      label="Login"
    />
    <Input
      v-model="password"
      label="Password"
      type="password"
    />
    <Input
      v-model="passwordRepeat"
      label="Enter your password again"
      type="password"
    />
    <Checkbox v-model="agreementAccepted"> I accept the agreement </Checkbox>
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
