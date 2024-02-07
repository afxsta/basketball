<script lang="ts" setup>
import { ISelectedItemProps } from '@/shared/ui/select'
import IconClose from '@/shared/assets/images/icons/icon-close.svg'
import { ref } from 'vue'

const props = defineProps<ISelectedItemProps>()
const emit = defineEmits<{
  /**
   * * Удаление элемента
   */
  (e: 'delete', id: number): void
}>()

/**
 * * DOM элемент компонента
 */
const $el = ref<HTMLDivElement>()

/**
 * * Отправка события для удаления элемента списка
 */
const deleteItem = () => emit('delete', props.option?.Id)

/**
 * * Код для использования по ref
 */
defineExpose({
  $el,
})
</script>
<template>
  <div
    class="selected-item"
    ref="$el"
    :class="{ 'text-only': hideDelete }"
    @click.stop
  >
    <span v-text="props.option?.Text" />
    <img
      v-if="!hideDelete"
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
  background-color: $red;
  color: $white;
  padding: 0 24px 0 4px;
  border-radius: 4px;
  user-select: none;
  cursor: default;

  &.text-only {
    padding: 0 4px;
  }

  img {
    position: absolute;
    top: 50%;
    right: 4px;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
</style>
