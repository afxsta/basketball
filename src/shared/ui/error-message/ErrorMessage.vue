<script lang="ts" setup>
import { IErrorMessageProps } from '@/shared/ui/error-message'

defineProps<IErrorMessageProps>()
</script>
<template>
  <div
    class="error-message-wrapper"
    :class="{ reverse: messageAbove }"
  >
    <slot />
    <div
      class="error-message-wrapper_message"
      :class="{ static: messageStatic }"
    >
      <slot name="error" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.error-message-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  width: 100%;
  gap: 2px;

  &.reverse {
    flex-direction: column-reverse;
  }

  &_message {
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    color: $lightest-red;
    pointer-events: none;

    &.static {
      position: static;
    }
  }
}
</style>
