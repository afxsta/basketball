<script lang="ts" setup>
import { IPaginatorProps } from '@/features'
import { computed, ref } from 'vue'
import { Select, SelectOptionModel } from '@/shared'

/**
 * * Параметры компонента
 */
const props = defineProps<IPaginatorProps>()
/**
 * * События компонента
 */
const emit = defineEmits<{
  /**
   * * Смена страницы
   */
  (e: 'change', page: number): void
  /**
   * * Синхронизация размеров страницы
   */
  (e: 'update:size', page: number): void
}>()

/**
 * * Выбор количества элементов на странице
 */
const sizeOptions = ref([
  new SelectOptionModel({ Id: 6, Text: '6' }),
  new SelectOptionModel({ Id: 12, Text: '12' }),
  new SelectOptionModel({ Id: 24, Text: '24' }),
])

/**
 * * Видно многоточие в начале
 */
const isDotsBefore = computed(() => 4 - props.current < 0)
/**
 * * Видно многоточие в конце
 */
const isDotsAfter = computed(() => props.total - props.current > 3)
/**
 * * Выбор размеров страницы
 */
const selectSize = computed({
  get: () => (props.size ? [props.size] : []),
  set: (_value) => emit('update:size', _value[0] || sizeOptions.value[0].Id),
})
/**
 * * Отображаемые страницы
 */
const visiblePages = computed(() => {
  if (props.total < 5) {
    return Array.from({ length: props.total - 2 }, (_, i) => i + 2)
  }

  const isFinish = props.current + 3 >= props.total
  const isEdge = props.current <= 4

  let _length = isEdge || isFinish ? 4 : 3

  return Array.from({ length: _length }, (_, i) =>
    Math.min(
      i +
        (isFinish
          ? props.total - 4
          : props.current <= 4
          ? 2
          : props.current - 1)
    )
  )
})

/**
 * * Отправка запроса на смену страницы
 */
const changePage = (_page: number) => emit('change', _page)
/**
 * * Получить класс страницы
 */
const getPageItemClass = (_page: number) => [
  'paginator_item',
  { active: _page == props.current },
]
</script>
<template>
  <div class="paginator-wrapper">
    <div class="paginator">
      <div
        :class="getPageItemClass(1)"
        @click="changePage(1)"
      >
        {{ 1 }}
      </div>
      <div
        v-if="isDotsBefore"
        class="paginator_dots"
      >
        ...
      </div>
      <div
        v-for="page in visiblePages"
        :class="getPageItemClass(page)"
        @click="changePage(page)"
      >
        {{ page }}
      </div>
      <div
        v-if="isDotsAfter"
        class="paginator_dots"
      >
        ...
      </div>
      <div
        v-if="total > 1"
        :class="getPageItemClass(total)"
        @click="changePage(total)"
      >
        {{ total }}
      </div>
    </div>
    <Select
      class="paginator-wrapper_select"
      is-white
      :options="sizeOptions"
      v-model="selectSize"
    />
  </div>
</template>
<style lang="scss" scoped>
.paginator-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;

  .paginator {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;

    &_item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      color: $grey;
      border-radius: 4px;
      transition: $transition-1;
      user-select: none;
      cursor: pointer;

      &:hover {
        color: $dark-grey;
      }

      &.active {
        color: $white;
        background-color: $red;
      }
    }
    &_dots {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: none;
    }
  }

  &_select {
    max-width: 88px;
  }
}
</style>
