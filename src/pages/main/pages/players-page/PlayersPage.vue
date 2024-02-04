<script lang="ts" setup>
import { PaginationModel, FilterModel, usePlayerStore } from '@/entities'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { ItemCard, Input, Select, Button } from '@/shared'
import IconAdd from '@/shared/assets/images/icons/icon-add.svg'

const playerStore = usePlayerStore()
const { players } = storeToRefs(playerStore)
const { getPlayers } = playerStore

/**
 * * Поисковой запрос
 */
const search = ref('')

/**
 * * После рендера компонента
 */
onMounted(() => updatePlayers())

/**
 * * Обновить список игроков
 */
const updatePlayers = () => {
  getPlayers(
    new FilterModel({
      Pagination: new PaginationModel({
        Page: 1,
        PageSize: 6,
      }),
    })
  )
}
</script>
<template>
  <div class="players-page">
    <div class="players-page_filter">
      <Input
        v-model="search"
        placeholder="Search ..."
        is-search
        width="364px"
        @update:model-value="updatePlayers"
      />
      <Select @update:model-value="updatePlayers" />
      <Button
        class="players-page_filter_add"
        width="104px"
      >
        Add
        <img
          :src="IconAdd"
          alt="add"
        />
      </Button>
    </div>
    <ItemCard v-for="player in players">
      <template #image>
        <img
          :src="player.Image"
          alt="player-image"
        />
      </template>
      <template #title> {{ player.Name }} </template>
      <template #subtitle> {{ player.Team }} </template>
    </ItemCard>
  </div>
</template>
<style lang="scss">
.players-page {
  display: flex;
  flex-direction: column;
  &_filter {
    display: flex;
    gap: 24px;
    margin-bottom: 32px;
    &_add {
      margin-left: auto;
    }
  }
}
</style>
