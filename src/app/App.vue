<script lang="ts" setup>
import { ref } from 'vue'
import { Select, SelectOptionModel } from '@/shared'

const selectedOptions = ref<number[]>()
const options = ref([
  new SelectOptionModel({ Id: 1, Text: 'Игрок 1' }),
  new SelectOptionModel({ Id: 2, Text: 'Игрок 2' }),
  new SelectOptionModel({ Id: 3, Text: 'Игрок 3' }),
  new SelectOptionModel({ Id: 4, Text: 'Игрок 4' }),
  new SelectOptionModel({ Id: 5, Text: 'Игрок 5' }),
  new SelectOptionModel({ Id: 6, Text: 'Игрок 6' }),
])
const selectValues = (e: number[]) => console.log(e)
</script>

<template>
  <div id="app">
    <div :style="{ padding: '20px' }">
      <Select
        is-multi
        v-model="selectedOptions"
        :options="options"
        @update:model-value="selectValues"
      />
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
