<script lang="ts" setup>
import { computed } from 'vue'
import { IInputProps } from '@/shared/ui/input'
import { ErrorMessage } from '../error-message'

const props = withDefaults(defineProps<IInputProps>(), {
  label: '',
  error: 'АШЫБКА',
  disabled: true,
})
const emit = defineEmits<{
  /**
   * * Отправка введенного текста
   */
  (e: 'update:modelValue', value: string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (_value) => emit('update:modelValue', _value || ''),
})

/**
 * * Классы поля ввода
 */
const inputClasses = computed(() => ({
  error: props.error,
  disabled: props.disabled,
}))
</script>
<template>
  <div class="ui-input-wrapper f fd-col jc-c fs_1">
    <label
      v-if="label"
      for="input"
      class="ui-input-wrapper_label"
      v-text="label"
    />
    <ErrorMessage>
      <template #default>
        <input
          id="input"
          :class="inputClasses"
          v-bind="props"
          v-model="value"
        />
      </template>
      <template #error>
        {{ error }}
      </template>
    </ErrorMessage>
  </div>
</template>
<style lang="scss" scoped>
.ui-input-wrapper {
  cursor: default;

  &:hover {
    input:not(.disabled) {
      background-color: var(--lightest-grey);
    }
  }

  &_label {
    color: var(--grey);
    padding-bottom: var(--indent-1);
  }

  input {
    width: 100%;
    height: 40px;
    position: relative;
    outline: none;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: var(--dark-grey);
    background-color: var(--lightest-grey1);
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 0 var(--indent-2);
    transition: var(--transition-1);
    cursor: text;

    &.error {
      border-color: var(--lightest-red);
    }
    &.disabled {
      pointer-events: none;
      color: var(--lightest-grey);
    }

    &:focus,
    &:active {
      background-color: var(--lightest-grey1);
      box-shadow: 0px 0px 5px 0px var(--shadow-grey);
    }
  }
}
</style>
