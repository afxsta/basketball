<script lang="ts" setup></script>
<template>
  <div class="auth-page">
    <div class="auth-page_form">
      <RouterView />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.auth-page {
  display: flex;
  &_form {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
