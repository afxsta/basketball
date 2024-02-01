<script lang="ts" setup>
import { SelectOptionModel, Button } from '@/shared'
</script>

<template>
  <div id="app">
    <div :style="{ padding: '20px' }">
      <Button>Button</Button>
    </div>
  </div>
</template>

<style lang="scss">
html,
body,
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
html {
  font-size: 14px;
  font-family: Avenir;
}
body {
  height: 100vh;
  width: 100vw;
}
</style>
