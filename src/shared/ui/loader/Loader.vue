<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { ILoaderProps } from '@/shared'

/**
 * * Параметры компонента
 */
const props = defineProps<ILoaderProps>()

/**
 * * Интервал для анимации
 */
const animationInterval = ref()
/**
 * * Текущая точка
 */
const currentDot = ref(1)

/**
 * * Отслеживание изменений параметра isLoading
 */
watch(() => props.isLoading, toggleLoader)

/**
 * * После рендера компонента
 */
onMounted(() => toggleLoader())
/**
 * * Перед удалением компонента
 */
onUnmounted(() => clearInterval(animationInterval.value))

/**
 * * Переключение интервала для анимации
 */
function toggleLoader() {
  if (props.isLoading) {
    animationInterval.value = setInterval(() => {
      currentDot.value = currentDot.value >= 3 ? 1 : currentDot.value + 1
    }, 250)
  } else {
    clearInterval(animationInterval.value)
  }
}
/**
 * * Получить класс точки
 */
const getDotClass = (_index: number) => [
  'loader_dot',
  { hidden: _index != currentDot.value },
]
</script>
<template>
  <transition name="loader">
    <div
      v-if="isLoading"
      class="loader"
    >
      <div
        v-for="i in 3"
        :key="i"
        :class="getDotClass(i)"
      />
    </div>
    <slot v-else />
  </transition>
</template>
<style lang="scss" scoped>
.loader-enter-active,
.loader-leave-active {
  transition: opacity 0.3s ease;
}

.loader-enter-from,
.loader-leave-to {
  opacity: 0;
}

.loader {
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  width: 100%;

  &_dot {
    width: 100%;
    max-height: 100px;
    max-width: 100px;
    aspect-ratio: 1;
    background-color: $red;
    border-radius: 50%;
    transition: 0.5s;
    &.hidden {
      opacity: 0.3;
      transform: scale(0.3);
    }
  }
}
</style>
