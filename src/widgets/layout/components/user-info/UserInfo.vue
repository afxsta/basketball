<script lang="ts" setup>
import { IUserInfoProps } from '@/widgets/layout'
import IconProfile from '@/shared/assets/images/icons/profile.svg'
import { computed } from 'vue'
import { GeneralModel } from '@/entities'

/**
 * * Параметры компонента
 */
const props = withDefaults(defineProps<IUserInfoProps>(), {
  info: () => new GeneralModel(),
})

/**
 * * Изображения для аватарки
 */
const avatarImage = computed(() => props.info?.Image || IconProfile)
</script>
<template>
  <div class="user-info">
    <span
      v-text="info?.Name || 'John Smith'"
      class="user-info_name"
    />
    <img
      class="user-info_image"
      alt="avatar"
      :src="avatarImage"
    />
  </div>
</template>
<style lang="scss" scoped>
.user-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  cursor: pointer;

  &_name {
    color: $dark-grey;
    transition: $transition-1;
  }

  &_image {
    width: 30px;
    height: 30px;
    min-width: 30px;
    min-height: 30px;
    border-radius: 50%;
  }

  &:hover {
    .user-info_name {
      color: $red;
    }
  }
}
</style>
