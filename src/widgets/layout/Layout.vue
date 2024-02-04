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
  min-width: 100vw;
  min-height: 100vh;
  background-color: var(--lightest-grey1);

  &_content {
    padding: 112px 80px 20px 220px;
  }
}
</style>
