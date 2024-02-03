<script lang="ts" setup>
import { ErrorMessage, ICheckboxProps } from '@/shared/ui'
import IconDone from '@/shared/assets/images/icons/icon-done.svg'
import { computed } from 'vue'

const props = defineProps<ICheckboxProps>()
const emit = defineEmits<{
  /**
   * * События смены активности чекбокса
   */
  (e: 'update:modelValue', active: boolean): void
}>()

/**
 * * Поле для выбора чекбокса
 */
const value = computed({
  get: () => props.modelValue,
  set: (_value) => emit('update:modelValue', _value),
})

/**
 * * Классы чекбокса
 */
const checkboxClasses = computed(() => [
  'ui-checkbox-wrapper',
  {
    active: props.modelValue,
    disabled: props.disabled,
    error: props.error && !props.modelValue,
  },
])

/**
 * * Переключить значение чекбокса
 */
const toggleCheckbox = () => {
  if (!props.disabled) value.value = !props.modelValue
}
</script>
<template>
  <ErrorMessage>
    <template #default>
      <div
        :class="checkboxClasses"
        @click="toggleCheckbox"
      >
        <div class="ui-checkbox">
          <img
            v-if="modelValue"
            :src="IconDone"
            alt="icon-done"
          />
        </div>
        <slot />
      </div>
    </template>
    <template #error>
      <span
        v-if="!modelValue"
        v-text="error"
      />
    </template>
  </ErrorMessage>
</template>
<style lang="scss" scoped>
.ui-checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 24px;
  max-width: fit-content;
  cursor: pointer;
  color: var(--grey);
  font-size: 14px;
  user-select: none;

  &.disabled {
    color: var(--lightest-grey);
    cursor: default;
    pointer-events: none;
    .ui-checkbox {
      border-color: var(--lightest-grey);
      background-color: var(--lightest-grey1);
    }
  }

  &:hover:not(.disabled) .ui-checkbox {
    border-color: var(--red);
  }

  &.error {
    color: var(--lightest-red);
    .ui-checkbox {
      border-color: var(--lightest-red);
    }
  }

  &.active .ui-checkbox {
    background-color: var(--red);
    border: var(--red);

    &.disabled .ui-checkbox {
      background-color: var(--lightest-grey);
      border: var(--lightest-grey);
    }
  }

  .ui-checkbox {
    position: relative;
    width: 12px;
    height: 12px;
    border: 1px solid var(--light-grey);
    border-radius: 2px;
    transition: var(--transition-1);
    cursor: pointer;
    user-select: none;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
