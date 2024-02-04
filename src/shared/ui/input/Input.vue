<script lang="ts" setup>
import { computed, ref } from 'vue'
import { IInputProps } from '@/shared/ui/input'
import { ErrorMessage } from '../error-message'
import SearchIcon from '@/shared/assets/images/icons/search_rounded.svg'
import debounce from 'lodash/debounce'
import { getCurrentInstance } from 'vue'

const props = withDefaults(defineProps<IInputProps>(), {
  label: '',
  error: '',
  timeInterval: 1000,
  type: 'text',
  placeholder: '',
  width: '100%',
})
const emit = defineEmits<{
  /**
   * * Отправка введенного текста
   */
  (e: 'update:modelValue', value: string): void
}>()

/**
 * * Поле для работы с debounce
 */
const debouncedSetter = ref()
/**
 * * Id поля ввода
 */
const inputId = computed(() => getCurrentInstance()?.uid?.toString())

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
  <div
    class="ui-input-wrapper"
    :style="{ width }"
  >
    <label
      v-if="label"
      :for="inputId"
      class="ui-input-wrapper_label"
      v-text="label"
    />
    <ErrorMessage>
      <template #default>
        <div class="ui-input-wrapper_block">
          <input
            :id="inputId"
            :class="inputClasses"
            :type="type"
            :placeholder="placeholder"
            v-model="value"
          />
          <div class="ui-input-wrapper_block_icon">
            <slot name="icon">
              <img
                v-if="isSearch"
                alt="icon-search"
                :src="SearchIcon"
              />
            </slot>
          </div>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
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
      line-height: 14px;
      color: var(--dark-grey);
      background-color: var(--white);
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
    }
  }
}
</style>
