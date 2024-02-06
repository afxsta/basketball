<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '@/entities'

/**
 * * Стор для управления уведомлениями
 */
const { notifications } = storeToRefs(useNotificationStore())
</script>
<template>
  <div class="notifications-wrapper">
    <TransitionGroup name="notification-fade">
      <div
        class="notifications-wrapper_item"
        v-for="notification in notifications"
        v-text="notification.Text"
        :key="notification.Id"
      />
    </TransitionGroup>
  </div>
</template>
<style lang="scss">
.notifications-wrapper {
  position: fixed;
  top: 36px;
  right: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-left: 12px;
  z-index: 10000;

  &_item {
    display: flex;
    align-items: center;
    max-width: 470px;
    min-height: 40px;
    border-radius: 4px;
    padding: 0 16px;
    background-color: $light-red;
    color: $white;
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    word-break: break-word;
  }

  .notification-fade-enter-active,
  .notification-fade-leave-active {
    transition: $transition-2;
  }
  .notification-fade-enter-from,
  .notification-fade-leave-to {
    opacity: 0;
    transform: scale(0.3);
  }

  @media (max-width: $small) {
    top: 12px;
    right: 12px;
  }
}
</style>
