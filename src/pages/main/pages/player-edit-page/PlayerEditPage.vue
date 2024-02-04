<script lang="ts" setup>
import { PlayerModel } from '@/entities'
import { Input, Select, Button, DatePicker } from '@/shared'
import { computed, ref } from 'vue'
import IconAddImage from '@/shared/assets/images/icons/icon-add-image.svg'
import { useRouter } from 'vue-router'

/**
 * * Маршруты
 */
const router = useRouter()
/**
 * * Данные об игроке
 */
const user = ref(new PlayerModel())

/**
 * * Вычисляемая установка высоты игрока
 */
const userHeight = computed({
  get: () => user.value?.Height?.toString(),
  set: (value) => (user.value.Height = Math.max(0, Number(value))),
})
/**
 * * Вычисляемая установка веса игрока
 */
const userWeight = computed({
  get: () => user.value?.Weight?.toString(),
  set: (value) => (user.value.Weight = Math.max(0, Number(value))),
})

/**
 * * Отмена редактирования игрока
 */
const cancelEdit = () => router.push({ name: 'players' })
/**
 * * Отправка запроса на сохранение игрока
 */
const savePlayer = () => {}
</script>
<template>
  <div class="player-edit-page">
    <div
      class="player-edit-page_image"
      :class="{ empty: !user?.Image }"
    >
      <img :src="user?.Image || IconAddImage" />
    </div>
    <div class="player-edit-page_form">
      <Input
        v-model="user.Name"
        label="Name"
      />
      <Select label="Position" />
      <Select label="Team" />
      <div class="player-edit-page_form_row">
        <Input
          v-model="userHeight"
          type="number"
          label="Height (cm)"
        />
        <Input
          v-model="userWeight"
          type="number"
          label="Weight (kg)"
        />
      </div>
      <div class="player-edit-page_form_row">
        <DatePicker
          v-model="user.Birthday"
          label="Birthday"
        />
        <Input
          v-model="user.Number"
          type="number"
          label="Number"
        />
      </div>
      <div class="player-edit-page_form_row">
        <Button
          secondary
          @click="cancelEdit"
        >
          Cancel
        </Button>
        <Button @click="savePlayer"> Save </Button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.player-edit-page {
  display: flex;
  gap: 136px;
  background-color: var(--white);
  border-radius: 10px;
  padding: 48px 74px;
  &_image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 336px;
    max-height: 260px;
    background-color: var(--light-grey);
    border-radius: 10px;
    &.empty {
      opacity: 0.5;
    }
  }
  &_form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    width: 100%;
    max-width: 366px;

    &_row {
      display: flex;
      align-items: center;
      width: 100%;
      gap: 24px;
    }
  }
}
</style>
