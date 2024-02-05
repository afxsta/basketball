<script lang="ts" setup>
import datepicker from 'vue3-datepicker'
import { IDatePickerProps, ErrorMessage } from '@/shared'
import { computed } from 'vue'

/**
 * * Параметры компонента
 */
const props = defineProps<IDatePickerProps>()
/**
 * * События компонента
 */
const emit = defineEmits(['update:modelValue'])

/**
 * * Классы компонента
 */
const componentClasses = computed(() => [
  'date-picker_component',
  { error: !!props.error },
])

/**
 * * Поле для выбора даты
 */
const dateValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    const selectedDateTime = value?.getTime()
    const currentDateTime = new Date().getTime()

    emit(
      'update:modelValue',
      new Date(Math.min(currentDateTime, selectedDateTime))
    )
  },
})
</script>
<template>
  <div class="date-picker">
    <div
      v-text="label"
      class="date-picker_label"
    />
    <ErrorMessage>
      <datepicker
        v-model="dateValue"
        :class="componentClasses"
      />
      <template #error>
        {{ error }}
      </template>
    </ErrorMessage>
  </div>
</template>
<style lang="scss">
.date-picker {
  display: flex;
  flex-direction: column;
  width: 100%;

  &_label {
    color: $grey;
    padding-bottom: $indent-1;
  }
  &_component {
    height: 40px;
    outline: none;
    background-color: $lightest-grey1;
    color: $dark-grey;
    border: none;
    border-radius: 4px;
    transition: $transition-1;
    padding: 0 12px;
    width: 100%;

    &.error {
      border: 1px solid $lightest-red;
    }

    &:hover {
      background-color: $lightest-grey;
    }
    &:focus,
    &:active {
      background-color: $lightest-grey1;
      box-shadow: 0px 0px 5px 0px $shadow-grey;
    }
  }
  .v3dp__datepicker {
    button:not(:disabled):hover span {
      background-color: $red;
      transition: $transition-1;
    }
  }
}
</style>
