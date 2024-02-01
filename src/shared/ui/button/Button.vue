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
  transition: var(--transition-1);
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
    background-color: var(--red);
    color: var(--white);

    &:hover {
      background-color: var(--light-red);
    }

    &:active {
      background-color: var(--dark-red);
    }

    &.disabled {
      background-color: var(--lightest-grey1);
      color: var(--lightest-grey);
    }
  }

  &.white {
    background-color: var(--white);
    color: var(--light-grey);
    border: 1px solid var(--light-grey);

    &:hover {
      background-color: var(--lightest-grey);
    }

    &:active {
      color: var(--grey);
      background-color: var(--light-grey);
    }

    &.disabled {
      background-color: var(--lightest-grey1);
      color: var(--lightest-grey);
    }
  }
}
</style>
