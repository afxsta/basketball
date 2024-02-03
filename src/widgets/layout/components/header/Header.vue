<script lang="ts" setup>
import Logo from '@/shared/assets/images/logo.svg'
import { UserInfo } from '@/widgets/layout'
</script>
<template>
  <div class="header">
    <a
      class="header_logo"
      href="/"
    >
      <img
        :src="Logo"
        alt="logo"
        draggable="false"
      />
    </a>
    <UserInfo />
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

  &_logo {
    img {
      user-select: none;
    }
  }
}
</style>
