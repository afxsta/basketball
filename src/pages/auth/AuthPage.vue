<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { SignInForm, SignUpForm } from '@/widgets'
import { Link } from '@/shared'
import SignInImage from '@/shared/assets/images/sign_in_image.svg'
import SignUpImage from '@/shared/assets/images/sign_up_image.svg'

/**
 * * Маршруты
 */
const router = useRouter()

/**
 * * Открыт роут авторизации
 */
const isSignIn = computed(() => router.currentRoute.value.name == 'sign-in')
/**
 * * Текущая форма аутентификации
 */
const currentAuthentification = computed(() =>
  isSignIn.value ? SignInForm : SignUpForm
)
/**
 * * Заголовок формы
 */
const formTitle = computed(() => (isSignIn.value ? 'Sign In' : 'Sign Up'))
/**
 * * Изображение на фоне
 */
const backgroundImage = computed(() =>
  isSignIn.value ? SignInImage : SignUpImage
)
</script>
<template>
  <div class="auth-page">
    <div class="auth-page_form">
      <div
        v-text="formTitle"
        class="auth-page_form_title"
      />
      <component :is="currentAuthentification" />
      <div class="auth-page_form_question">
        <template v-if="isSignIn">
          Not a member yet? <Link href="sign-up">Sign up</Link>
        </template>
        <template v-else>
          Already a member? <Link href="sign-in">Sign in</Link>
        </template>
      </div>
    </div>
    <div class="auth-page_background">
      <img
        :src="backgroundImage"
        alt=""
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.auth-page {
  display: flex;
  min-width: 100vw;
  min-height: 100vh;
  &_form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 42%;
    max-width: 606px;
    padding: 24px;
    background-color: $white;
    &_title {
      font-size: 36px;
      color: $blue;
      margin-bottom: 32px;
    }
    &_question {
      margin-top: 24px;
      color: $grey;
    }
  }
  &_background {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $light-blue;
    padding: 86px;
    img {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>
