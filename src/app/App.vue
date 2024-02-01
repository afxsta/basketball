<script lang="ts" setup>
import { Checkbox } from '@/shared'
import { ref } from 'vue'

const check = ref(false)
</script>
<template>
  <div id="app">
    <div :style="{ padding: '20px' }">
      <Checkbox v-model="check"> Text </Checkbox>
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
