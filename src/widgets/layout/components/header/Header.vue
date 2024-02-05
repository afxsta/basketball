<script lang="ts" setup>
import Logo from '@/shared/assets/images/logo.svg'
import { UserInfo } from '@/widgets/layout'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/entities'
import IconBurger from '@/shared/assets/images/icons/icon-burger.svg'

/**
 * * Стор текущего пользователя
 */
const { user } = storeToRefs(useAuthStore())

/**
 * * События компонента
 */
const emit = defineEmits(['toggleSidebar'])

/**
 * * Отправка события для открытия сайбара
 */
const toggleSidebar = () => emit('toggleSidebar')
</script>
<template>
  <div class="header">
    <RouterLink
      class="header_logo"
      :to="{ name: 'players' }"
    >
      <img
        :src="Logo"
        alt="logo"
        draggable="false"
      />
    </RouterLink>
    <UserInfo
      class="header_user"
      :info="user"
    />
    <img
      class="header_burger"
      :src="IconBurger"
      alt="burger"
      @click="toggleSidebar"
    />
  </div>
</template>
<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 0 50px;
  box-shadow: 0px 1px 10px 0px #d1d1d180;
  background-color: $white;
  z-index: 101;

  &_logo {
    img {
      user-select: none;
    }
  }

  &_burger {
    display: none;

    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  @media (max-width: $small) {
    justify-content: center;

    .header_user {
      display: none;
    }

    &_burger {
      display: block;
    }
  }
}
</style>
