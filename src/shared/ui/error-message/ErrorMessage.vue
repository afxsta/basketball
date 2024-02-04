<template>
  <div class="error-message-wrapper">
    <slot />
    <div class="error-message-wrapper_message">
      <slot name="error" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.error-message-wrapper {
  position: relative;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;

  &_message {
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    color: $lightest-red;
    pointer-events: none;
  }
}
</style>
