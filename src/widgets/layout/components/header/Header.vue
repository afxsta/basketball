<script lang="ts" setup>
import Logo from '@/shared/assets/images/logo.svg'
import { UserInfo } from '@/widgets/layout'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/entities'

/**
 * * Стор текущего пользователя
 */
const { user } = storeToRefs(useAuthStore())
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
    <UserInfo :info="user" />
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
  z-index: 100;

  &_logo {
    img {
      user-select: none;
    }
  }
}
</style>
