<script lang="ts" setup>
import { IPaginatorProps } from '@/features'
import { computed } from 'vue'

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
}>()

/**
 * * Видно многоточие в начале
 */
const isDotsBefore = computed(() => 3 - props.current < 0)
/**
 * * Видно многоточие в конце
 */
const isDotsAfter = computed(() => props.total - props.current > 2)
/**
 * * Отображаемые страницы
 */
const visiblePages = computed(() =>
  Array.from(
    { length: 3 },
    (_, i) => i + (props.current < 3 ? 2 : props.current - 1)
  )
)

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
      :class="getPageItemClass(total)"
      @click="changePage(total)"
    >
      {{ total }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
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
    color: var(--grey);
    border-radius: 4px;
    transition: var(--transition-1);
    user-select: none;
    cursor: pointer;

    &:hover {
      color: var(--dark-grey);
    }

    &.active {
      color: var(--white);
      background-color: var(--red);
    }
  }
  &_dots {
    pointer-events: none;
  }
}
</style>
