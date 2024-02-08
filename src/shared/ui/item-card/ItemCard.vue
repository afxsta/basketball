<script lang="ts" setup></script>
<template>
  <div class="item-card">
    <div class="item-card_inner">
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
  </div>
</template>
<style lang="scss">
.item-card {
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  aspect-ratio: 0.95;
  overflow: hidden;
  cursor: pointer;
  width: 100%;

  @media (max-width: $small) {
    aspect-ratio: 0.84;
  }

  &_inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }

  &_image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    background: linear-gradient(121.57deg, $grey 1.62%, $dark-grey1 81.02%);

    img {
      width: 100%;
      max-height: 100%;
      height: auto;
      max-width: 150px;
      max-height: 150px;

      @media (max-width: $small) {
        max-width: 50px;
        max-height: 150px;
      }
    }
  }
  &_info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 8px;
    padding: 22px 11px;
    background-color: $dark-grey;
    text-align: center;
    &_title {
      color: $white;
      font-size: 18px;
      .c-red {
        font-size: 18px;
      }
      text-decoration: none;
    }
    &_subtitle {
      color: $light-grey;
      text-decoration: none;
    }
  }

  &.player {
    .item-card_image {
      padding: 0 45px;
      align-items: flex-end;
      width: 100%;

      img {
        max-width: none;
        max-height: none;
      }

      @media (max-width: $small) {
        padding: 0 24px;
      }
    }
  }
}
</style>
