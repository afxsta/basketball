<script lang="ts" setup>
import { Header, Sidebar } from '@/widgets/layout'
</script>
<template>
  <div class="layout">
    <Header />
    <Sidebar />
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.layout {
  position: relative;
  min-width: 100vw;
  min-height: 100vh;
  background-color: var(--lightest-grey1);
}
</style>
