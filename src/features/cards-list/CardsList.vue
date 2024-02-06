<script lang="ts" setup>
import { ItemCard, Loader } from '@/shared'
import { ICardsListProps, Paginator } from '@/features'
import { GeneralModel, PaginationModel } from '@/entities'

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
   * * Событие для предпросмотра сущности
   */
  (e: 'open', id: number): void
  /**
   * * События для обновления списка
   */
  (e: 'update'): void
}>()

/**
 * * Отправка update события
 */
const sendUpdate = () => emit('update')
/**
 * * Смена страницы
 */
const setPage = (_page: number) => {
  if (props.pagination) props.pagination.Page = _page
  sendUpdate()
}
/**
 * * При клике по карточке
 */
const itemOnClick = (_id: number) => emit('open', _id)
</script>
<template>
  <div class="cards-list-wrapper f fd-col">
    <Loader :isLoading="isLoading">
      <div class="cards-list">
        <ItemCard
          v-for="item in items"
          class="cards-list_item"
          :key="item?.Id"
          @click="itemOnClick(item?.Id)"
        >
          <template #image>
            <img
              v-if="item.Image"
              :src="item.Image?.toString()"
              alt="image"
            />
          </template>
          <template #title> {{ item.Name }} </template>
          <template #subtitle>
            <slot
              name="subtitle"
              :item="item"
            />
          </template>
        </ItemCard>
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
    grid-template-columns: repeat(3, minmax(170px, min(364px, 100%)));
    gap: 24px;
    justify-content: flex-start;

    @media (max-width: 868px) {
      grid-template-columns: repeat(2, minmax(170px, min(364px, 100%)));
      gap: 12px;
    }

    &_item {
      width: 100%;
      min-width: 170px;
      max-width: 364px;
      min-height: 170px;
      max-height: 380px;
    }
  }
  &_paginator {
    margin-top: 32px;
    align-self: flex-start;
  }
}
</style>
