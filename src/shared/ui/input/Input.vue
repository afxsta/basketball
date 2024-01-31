<script lang="ts" setup>
import { computed } from 'vue'
import { IInputProps } from '@/shared/ui/input'

const props = withDefaults(defineProps<IInputProps>(), {
  label: '',
  error: '',
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
</script>
<template>
  <div class="ui-input-wrapper f fd-col jc-c fs_1">
    <label
      v-if="label"
      for="input"
      class="ui-input-wrapper_label"
      v-text="label"
    />
    <input
      id="input"
      v-model="value"
    />
  </div>
</template>
<style lang="scss" scoped>
.ui-input-wrapper {
  &:hover {
    input {
      background-color: var(--lightest-grey);
    }
  }

  &_label {
    color: var(--grey);
    padding-bottom: var(--indent-1);
  }

  input {
    outline: none;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: var(--dark-grey);
    background-color: var(--lightest-grey1);
    transition: var(--transition-1);
    border: none;
    border-radius: 4px;
    padding: 0 var(--indent-2);

    &:focus,
    &:active {
      background-color: var(--lightest-grey1);
      box-shadow: 0px 0px 5px 0px var(--shadow-grey);
    }
  }
}
</style>
