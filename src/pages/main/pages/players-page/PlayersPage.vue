<script lang="ts" setup>
import {
  PaginationModel,
  FilterModel,
  usePlayerStore,
  PlayerModel,
} from '@/entities'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { ItemCard, Input, Select, Button } from '@/shared'
import IconAdd from '@/shared/assets/images/icons/icon-add.svg'
import router from '@/app/router'

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
/**
 * * Открытие страницы с созданием пользователя
 */
const openPlayerCreate = () => router.push({ name: 'player-create' })
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
        @click="openPlayerCreate"
      >
        Add
        <img
          :src="IconAdd"
          alt="add"
        />
      </Button>
    </div>
    <div class="f">
      <CardsList :items="players">
        <template #subtitle="slotProps">
          {{ (slotProps.item as PlayerModel)?.Name }}
          {{ (slotProps.item as PlayerModel)?.Number }}
        </template>
      </CardsList>
    </div>
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
