<script lang="ts" setup></script>
<template>
  <div class="item-card">
    <div class="item-card_image">
      <slot name="image" />
    </div>
    <div class="item-card_info">
      <div class="item-card_info_title">
        <slot name="title" />
      </div>
      <div class="item-card_info_subtitle">
        <slot name="subtitle" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.item-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 364px;
  max-height: 380px;
  min-width: 170px;
  min-height: 200px;
  border-radius: 4px;
  overflow: hidden;

  &_image {
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 280px;
    height: 100%;
    width: 100%;
    background: linear-gradient(121.57deg, $grey 1.62%, $dark-grey1 81.02%);

    img {
      width: 100%;
      height: auto;
    }
  }
  &_info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 8px;
    min-height: 100px;
    background-color: $dark-grey;
    &_title {
      color: $white;
    }
    &_subtitle {
      color: $light-grey;
    }
  }
}
</style>
