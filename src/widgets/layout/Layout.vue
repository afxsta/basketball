<script lang="ts" setup>
import { Header, Sidebar } from '@/widgets/layout'
import { ref } from 'vue'

/**
 * * Компонент сайдбара
 */
const $sidebar = ref<InstanceType<typeof Sidebar>>()

/**
 * * Открытие сайдбара
 */
const toggleSidebar = () => {
  $sidebar.value?.toggle()
}
</script>
<template>
  <div class="layout">
    <Header @toggleSidebar="toggleSidebar" />
    <Sidebar ref="$sidebar" />
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
  min-height: calc(100vh - 132px);
  margin: 112px 80px 32px 220px;

  &_content {
    height: 100%;
  }

  @media (max-width: $small) {
    margin: 78px 0 12px;
  }
}
</style>
