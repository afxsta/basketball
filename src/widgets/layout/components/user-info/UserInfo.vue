<script lang="ts" setup>
import { IUserInfoProps } from '@/widgets/layout'
import { Avatar } from '@/shared'
import { GeneralModel } from '@/entities'

/**
 * * Параметры компонента
 */
const props = withDefaults(defineProps<IUserInfoProps>(), {
  info: () => new GeneralModel(),
  size: '30px',
})
</script>
<template>
  <div class="user-info">
    <span
      v-text="info?.Name"
      class="user-info_name"
    />
    <Avatar
      :image="props.info?.Image?.toString()"
      :size="size"
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

  &:hover {
    .user-info_name {
      color: $red;
    }
  }
}
</style>
