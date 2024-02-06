<script lang="ts" setup>
import IconProfile from '@/shared/assets/images/icons/profile.svg'
import { computed } from 'vue'
import { IAvatarProps } from '@/shared'

/**
 * * Параметры компонента
 */
const props = withDefaults(defineProps<IAvatarProps>(), {
  size: '30px',
})

/**
 * * Стили компонента
 */
const componentStyle = computed(() => ({
  width: props.size,
  height: props.size,
  'min-width': props.size,
  'min-height': props.size,
  'border-radius': '50%',
  display: 'block',
}))

/**
 * * Изображения для аватарки
 */
const avatarImage = computed(() => props.image || IconProfile)
</script>
<template>
  <img
    class="avatar-image"
    alt="avatar"
    :src="avatarImage"
    :style="componentStyle"
  />
</template>
