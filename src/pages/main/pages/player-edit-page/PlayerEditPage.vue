<script lang="ts" setup>
import { PlayerModel, usePlayerStore } from '@/entities'
import {
  Input,
  Select,
  Button,
  DatePicker,
  ImageLoader,
  Loader,
} from '@/shared'
import { computed, onMounted, ref } from 'vue'
import { TeamSelect } from '@/features'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

/**
 * * Маршруты
 */
const router = useRouter()
/**
 * * Стор для управления игроками
 */
const playerStore = usePlayerStore()
const { optionsPosition } = storeToRefs(playerStore)
const { updatePlayer, getPlayer, getPositions } = playerStore

/**
 * * Данные об игроке
 */
const player = ref(new PlayerModel())

/**
 * * Id редактируемого игрока
 */
const playerId = computed(() => Number(router.currentRoute.value?.params?.id))

/**
 * * После рендера компонента
 */
onMounted(async () => {
  await getPositions()

  if (playerId.value) {
    const response = await getPlayer(playerId.value)
    if (response.IsSuccess) {
      player.value = response.Value
    }
  }
})

/**
 * * Отмена редактирования игрока
 */
const cancelEdit = () => {
  if (playerId.value) {
    router.push({ name: 'player', params: { id: playerId.value } })
  } else {
    router.push({ name: 'players' })
  }
}
/**
 * * Отправка запроса на сохранение игрока
 */
const savePlayer = async () => {
  const response = await updatePlayer(player.value)
  if (response.IsSuccess) {
    router.push({ name: 'player', params: { id: response.Value?.Id } })
  }
}
/**
 * * Выбор позиции игрока
 */
const userPosition = computed({
  get: () => {
    const _id = optionsPosition.value.find(
      (p) => p.Text == player.value.Position
    )?.Id
    return typeof _id == 'number' ? [_id] : []
  },
  set: (_indexes) => {
    player.value.Position = optionsPosition.value?.[_indexes[0]]?.Text || ''
  },
})
/**
 * * Выбор команды игрока
 */
const userTeam = computed({
  get: () => (player.value.Team ? [player.value.Team] : []),
  set: (team) => (player.value.Team = team[0]),
})
</script>
<template>
  <div class="player-edit-page">
    <Loader />
    <ImageLoader v-model="player.Image" />
    <div class="player-edit-page_form">
      <Input
        v-model="player.Name"
        label="Name"
      />
      <Select
        :options="optionsPosition"
        label="Position"
        v-model="userPosition"
      />
      <TeamSelect
        v-model="userTeam"
        label="Team"
      />
      <div class="player-edit-page_form_row">
        <Input
          v-model="player.Height"
          type="number"
          label="Height (cm)"
        />
        <Input
          v-model="player.Weight"
          type="number"
          label="Weight (kg)"
        />
      </div>
      <div class="player-edit-page_form_row">
        <DatePicker
          v-model="player.Birthday"
          label="Birthday"
        />
        <Input
          v-model="player.Number"
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
  background-color: $white;
  border-radius: 10px;
  padding: 48px 74px;
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
