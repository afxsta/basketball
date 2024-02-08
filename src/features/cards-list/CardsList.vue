<script lang="ts" setup>
import { ItemCard, Loader } from "@/shared"
import { ICardsListProps, Paginator } from "@/features"
import { GeneralModel, PaginationModel } from "@/entities"

/**
 * * Параметры компонента
 */
const props = withDefaults(defineProps<ICardsListProps<GeneralModel>>(), {
  pagination: () => new PaginationModel(),
})
/**
 * * События компонента
 */
const emit = defineEmits<{
  /**
   * * События для обновления списка
   */
  (e: "update"): void
}>()

/**
 * * Отправка update события
 */
const sendUpdate = () => emit("update")
/**
 * * Смена страницы
 */
const setPage = (_page: number) => {
  if (props.pagination) props.pagination.Page = _page
  sendUpdate()
}
/**
 * * Получение роута сущности
 */
const getToPath = (_id: number) => ({
  name: props.isPlayers ? "player" : "team",
  params: { id: _id },
})
</script>
<template>
  <div class="cards-list-wrapper f fd-col">
    <Loader :isLoading="isLoading">
      <div class="cards-list">
        <RouterLink v-for="item in items" :to="getToPath(item.Id)">
          <ItemCard
            class="cards-list_item"
            :class="{ player: isPlayers }"
            :key="item?.Id"
          >
            <template #image>
              <img
                v-if="item.Image"
                :src="item.Image?.toString()"
                alt="image"
              />
            </template>
            <template #title>
              <slot name="title" :item="item">
                {{ item.Name }}
              </slot>
            </template>
            <template #subtitle>
              <slot name="subtitle" :item="item" />
            </template>
          </ItemCard>
        </RouterLink>
      </div>
    </Loader>
    <Paginator
      v-if="props.pagination?.Count > 6 && !isLoading && items?.length"
      class="cards-list-wrapper_paginator"
      :current="props.pagination?.Page"
      :total="props.pagination?.Total"
      v-model:size="props.pagination.PageSize"
      @update:size="sendUpdate"
      @change="setPage"
    />
  </div>
</template>
<style lang="scss" scoped>
.cards-list-wrapper {
  width: 100%;

  .cards-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    justify-content: flex-start;

    @media (max-width: $tablet) {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
  }
  &_paginator {
    margin-top: 32px;
    align-self: flex-start;
  }
}
</style>
