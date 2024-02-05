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
<style lang="scss">
body {
  background-color: $lightest-grey1;
}
.layout {
  position: relative;
  height: calc(100vh - 132px);
  margin: 112px 80px 20px 220px;

  &_content {
    height: 100%;
  }
}
</style>
