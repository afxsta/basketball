<script lang="ts" setup>
import { IPageHeaderProps } from '@/features'
import IconEdit from '@/shared/assets/images/icons/icon-edit.svg'
import IconDelete from '@/shared/assets/images/icons/icon-delete.svg'

/**
 * * Параметры компонента
 */
const props = defineProps<IPageHeaderProps>()
/**
 * * События компонента
 */
const emit = defineEmits<{
  /**
   * * События удаления сущности
   */
  (e: 'delete'): void
  /**
   * * События редактирования сущности
   */
  (e: 'edit'): void
}>()

/**
 * * Отправка события для удаления сущности
 */
const onDelete = () => emit('delete')
/**
 * * Отправка события для редактирования сущности
 */
const onEdit = () => emit('edit')
</script>
<template>
  <div class="page-header">
    <div class="page-header_path">
      <div
        v-for="(path, index) in paths"
        :key="path"
        class="page-header_path_item"
      >
        <div
          v-if="index"
          class="page-header_path_item_slash"
        >
          /
        </div>
        <span
          v-text="path"
          class="page-header_path_item_text"
        />
      </div>
    </div>
    <div class="page-header_controls">
      <img
        :src="IconEdit"
        alt="edit"
        @click="onEdit"
      />
      <img
        :src="IconDelete"
        alt="delete"
        @click="onDelete"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: $white;
  height: 70px;
  padding: 0 32px;

  &_path {
    display: flex;
    &_item {
      display: flex;
      line-height: 20px;

      &_slash {
        color: $light-grey;
        margin: 0 2px;
      }

      &_text {
        color: $red;
      }
    }
  }
  &_controls {
    display: flex;
    gap: 16px;
    cursor: pointer;
  }
}
</style>
