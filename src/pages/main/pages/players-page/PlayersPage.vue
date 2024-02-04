<script lang="ts" setup>
import { PaginationModel, PlayerFilterModel, usePlayerStore } from '@/entities'
import { ItemCard } from '@/shared'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const playerStore = usePlayerStore()
const { players } = storeToRefs(playerStore)
const { getPlayers } = playerStore

/**
 * * После рендера компонента
 */
onMounted(() => {
  getPlayers(
    new PlayerFilterModel({
      Pagination: new PaginationModel({
        Page: 1,
        PageSize: 6,
      }),
    })
  )
})
</script>
<template>
  {{ players }}
  <ItemCard v-for="player in players">
    <template #image>
      <img
        :src="player.Image"
        alt="player-image"
      />
    </template>
    <template #title> {{ player.Name }} </template>
    <template #subtitle> 123 </template>
  </ItemCard>
</template>
<style lang="scss"></style>
