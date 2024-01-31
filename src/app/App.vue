<script lang="ts" setup>
import { ref } from 'vue'
import { Input, Link } from '@/shared'
const value = ref('')
</script>

<template>
  <div id="app">
    <div class="icon-delete_rounded"></div>
    <Input
      v-model="value"
      label="Login"
    />
    <Link :href="'vk.com'">
      qeqweqwewq
    </Link>
  </div>
</template>

<style lang="scss" scoped>
html {
  background-color: var(--red);
  font-size: 14px;
  font-family: Avenir;
}
</style>
