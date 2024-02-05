<script lang="ts" setup></script>
<template>
  <div class="stopper">
    <slot name="image" />
    <div class="stopper_title">Empty here</div>
    <div class="stopper_text">
      <slot name="text" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.stopper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 48px;
  background-color: $white;
  max-width: 556px;
  max-height: 570px;
  width: 100%;
  border-radius: 15px;
  text-align: center;
  margin: auto;

  &_title {
    color: $lightest-red;
    font-weight: 800;
    font-size: 36px;
    line-height: 50px;
    margin-top: 48px;
  }

  &_text {
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
    margin-top: 24px;
  }
}
</style>
