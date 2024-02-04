<script lang="ts" setup>
import { Input, Button } from '@/shared'
import { ref } from 'vue'
import { useAuthStore, AuthModel } from '@/entities'

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
 * * Отправка запроса на вход в аккаунт
 */
const trySignIn = async () => {
  const response = await signIn(
    new AuthModel({
      Login: login.value,
      Password: password.value,
    })
  )
  console.log(response)
}
</script>
<template>
  <div class="sign-in">
    <Input
      v-model="login"
      label="Login"
    />
    <Input
      v-model="password"
      label="Password"
      type="password"
    />
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
}
</style>
