<script lang="ts" setup>
import { IButtonProps } from '@/shared/ui/button'
import { computed } from 'vue'

const props = withDefaults(defineProps<IButtonProps>(), {
  width: '100%',
})
const emit = defineEmits<{
  /**
   * * Событие клика по кнопке
   */
  (e: 'click'): void
}>()

/**
 * * Классы кнопки
 */
const buttonClasses = computed(() => [
  props.secondary ? 'white' : 'red',
  { disabled: props.disabled },
])

/**
 * * Отправка клик события
 */
const onClick = () => emit('click')
</script>
<template>
  <button
    class="ui-button"
    :style="{ width }"
    :class="buttonClasses"
    @click="onClick"
  >
    <slot />
  </button>
</template>
<style lang="scss" scoped>
.ui-button {
  height: 40px;
  transition: $transition-1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  outline: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;

  &.disabled {
    cursor: default;
    pointer-events: none;
  }

  &.red {
    background-color: $red;
    color: $white;

    &:hover {
      background-color: $light-red;
    }

    &:active {
      background-color: $dark-red;
    }

    &.disabled {
      background-color: $lightest-grey1;
      color: $lightest-grey;
    }
  }

  &.white {
    background-color: $white;
    color: $light-grey;
    border: 1px solid $light-grey;

    &:hover {
      background-color: $lightest-grey;
    }

    &:active {
      color: $grey;
      background-color: $light-grey;
    }

    &.disabled {
      background-color: $lightest-grey1;
      color: $lightest-grey;
    }
  }
}
</style>
