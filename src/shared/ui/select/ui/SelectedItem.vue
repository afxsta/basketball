<script lang="ts" setup>
import { ISelectedItemProps, SelectOptionModel } from '@/shared/ui/select'
import IconClose from '@/shared/assets/images/icons/icon-close.svg'

const props = defineProps<ISelectedItemProps>()
const emit = defineEmits<{
  /**
   * * Удаление элемента
   */
  (e: 'delete', id: number): void
}>()

/**
 * * Отправка события для удаления элемента списка
 */
const deleteItem = () => emit('delete', props.option?.Id)
</script>
<template>
  <div
    class="selected-item"
    @click.stop
  >
    <span v-text="props.option?.Text" />
    <img
      :src="IconClose"
      alt="icon-close"
      @click="deleteItem"
    />
  </div>
</template>
<style lang="scss" scoped>
.selected-item {
  height: 24px;
  white-space: nowrap;
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--red);
  color: var(--white);
  padding: 0 24px 0 4px;
  border-radius: 4px;
  user-select: none;
  cursor: default;

  img {
    position: absolute;
    top: 50%;
    right: 4px;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
</style>
