<script lang="ts" setup>
import { computed, ref } from 'vue'
import { IInputProps } from '@/shared/ui/input'
import { ErrorMessage } from '../error-message'
import SearchIcon from '@/shared/assets/images/search_rounded.svg'
import debounce from 'lodash/debounce'

const props = withDefaults(defineProps<IInputProps>(), {
  label: '',
  error: '',
  timeInterval: 1000,
})
const emit = defineEmits<{
  /**
   * * Отправка введенного текста
   */
  (e: 'update:modelValue', value: string): void
}>()

const debouncedSetter = ref()

/**
 * * Получение и отправка текста
 */
const value = computed({
  get: () => props.modelValue,
  set: (_value) => {
    if (props.isSearch) {
      if (debouncedSetter.value) debouncedSetter.value?.cancel()

      debouncedSetter.value = debounce(
        () => emit('update:modelValue', _value || ''),
        props.timeInterval
      )

      debouncedSetter.value()
    } else {
      emit('update:modelValue', _value || '')
    }
  },
})

/**
 * * Классы поля ввода
 */
const inputClasses = computed(() => ({
  error: props.error,
  disabled: props.disabled,
  search: props.isSearch,
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
        <div class="ui-input-wrapper_block">
          <input
            id="input"
            :class="inputClasses"
            v-bind="props"
            v-model="value"
          />
          <img
            v-if="isSearch"
            class="ui-input-wrapper_block_icon"
            alt="icon-search"
            :src="SearchIcon"
          />
        </div>
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
    input:not(.disabled, :focus, :active) {
      background-color: var(--lightest-grey);
    }
  }

  &_label {
    color: var(--grey);
    padding-bottom: var(--indent-1);
  }

  &_block {
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

    &_icon {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
    }
  }
}
</style>
