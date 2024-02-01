<script lang="ts" setup>
import { ref } from 'vue'
import { Input, Link } from '@/shared'
const value = ref('Текст')

const debounceTest = (value: string) => {
  console.log(value)
}
</script>

<template>
  <div id="app">
    <Input
      v-model="value"
      is-search
      label="Login"
      @update:model-value="debounceTest"
    />
    <Link :href="'qqq'"> Link </Link>
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
