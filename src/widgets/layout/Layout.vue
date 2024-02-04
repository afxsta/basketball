<script lang="ts" setup>
import { Header, Sidebar } from '@/widgets/layout'
</script>
<template>
  <div class="layout">
    <Header />
    <Sidebar />
    <div class="layout_content">
      <slot />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.layout {
  position: relative;
  background-color: $lightest-grey1;
  min-height: 100vh;

  &_content {
    max-width: 1440px;
    padding: 112px 80px 20px 220px;
  }
}
</style>
