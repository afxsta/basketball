<script lang="ts" setup>
import { ItemCard } from '@/shared'
import { ICardsListProps } from '@/features'
import { GeneralModel } from '@/entities'

/**
 * * Параметры компонента
 */
const props = defineProps<ICardsListProps<GeneralModel>>()
</script>
<template>
  <div class="cards-list">
    <ItemCard
      v-for="item in items"
      class="cards-list_item"
      :key="item?.Id"
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
</template>
<style lang="scss" scoped>
.cards-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1140px;
  gap: 24px;

  &_item {
    width: calc(100% / 3 - 16px);
  }
}
</style>
