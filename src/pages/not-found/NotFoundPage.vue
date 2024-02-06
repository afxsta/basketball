<script lang="ts" setup>
import { Stopper } from '@/shared'
import NotFounPageImage from '@/shared/assets/images/not-found-page-image.svg'
</script>
<template>
  <div class="not-found-page">
    <Stopper>
      <template #image>
        <img
          :src="NotFounPageImage"
          alt="404"
        />
      </template>
      <template #title> Page not found </template>
      <template #text> Sorry, we can’t find what you’re looking for </template>
    </Stopper>
  </div>
</template>
<style lang="scss" scoped>
.not-found-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $white;
}
</style>
