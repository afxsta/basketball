<script lang="ts" setup>
import {
  FilterModel,
  PaginationModel,
  PlayerModel,
  usePlayerStore,
  useTeamStore,
} from '@/entities'
import {
  Input,
  Select,
  Button,
  DatePicker,
  ImageLoader,
  Loader,
  SelectOptionModel,
} from '@/shared'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

/**
 * * Маршруты
 */
const router = useRouter()
/**
 * * Данные об игроке
 */
const user = ref(new PlayerModel())
/**
 * * Стор для управления игроками
 */
const playerStore = usePlayerStore()
const { optionsPosition } = storeToRefs(playerStore)
const { addPlayer } = playerStore
/**
 * * Стор для управления командами
 */
const teamStore = useTeamStore()
const { pagination } = storeToRefs(teamStore)
const { getTeams } = teamStore

/**
 * * Список команд для выбора
 */
const teamsOptions = ref<SelectOptionModel[]>([])

/**
 * * После рендера компонента
 */
onMounted(async () => {
  await playerStore.getPositions()
  await getTeamsOptions()
})

/**
 * * Получить список комнадл
 */
const getTeamsOptions = async () => {
  if (pagination.value && pagination.value.Count <= teamsOptions.value.length)
    return

  const loadSize = 6

  const request = new FilterModel({
    Pagination: new PaginationModel({
      Page: teamsOptions.value?.length / loadSize + 1,
      PageSize: loadSize,
    }),
  })
  const response = await getTeams(request)
  if (response.IsSuccess) {
    const _options = response.Value.map(
      (t) =>
        new SelectOptionModel({
          Text: t.Name,
          Id: t.Id,
        })
    )
    teamsOptions.value.push(..._options)
  }
}
/**
 * * Отмена редактирования игрока
 */
const cancelEdit = () => router.push({ name: 'players' })
/**
 * * Отправка запроса на сохранение игрока
 */
const savePlayer = async () => {
  await addPlayer(user.value)
}
/**
 * * Выбор позиции игрока
 */
const userPosition = computed({
  get: () => {
    const _id = optionsPosition.value.find(
      (p) => p.Text == user.value.Position
    )?.Id
    return typeof _id == 'number' ? [_id] : []
  },
  set: (_indexes) => {
    user.value.Position = optionsPosition.value?.[_indexes[0]]?.Text || ''
  },
})
/**
 * * Выбор команды игрока
 */
const userTeam = computed({
  get: () => (user.value.Team ? [user.value.Team] : []),
  set: (team) => (user.value.Team = team[0]),
})
</script>
<template>
  <div class="player-edit-page">
    <Loader />
    <ImageLoader v-model="user.Image" />
    <div class="player-edit-page_form">
      <Input
        v-model="user.Name"
        label="Name"
      />
      <Select
        :options="optionsPosition"
        label="Position"
        v-model="userPosition"
      />
      <Select
        v-model="userTeam"
        label="Team"
        :options="teamsOptions"
        @scroll-bottom="getTeamsOptions"
      />
      <div class="player-edit-page_form_row">
        <Input
          v-model="user.Height"
          type="number"
          label="Height (cm)"
        />
        <Input
          v-model="user.Weight"
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
