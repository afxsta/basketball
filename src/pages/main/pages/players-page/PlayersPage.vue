<script lang="ts" setup>
import {
  FilterModel,
  PaginationModel,
  PlayerModel,
  TeamModel,
  usePlayerStore,
  useTeamStore,
} from '@/entities'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
import { Input, Button, Loader } from '@/shared'
import { useLoading } from '@/shared/composables/loading/use-loading'
import { CardsList, TeamSelect } from '@/features'
import IconAdd from '@/shared/assets/images/icons/icon-add.svg'
import { useRouter } from 'vue-router'
import { Stopper } from '@/shared'
import PlayerEmpty from '@/shared/assets/images/player-empty.svg'

/**
 * * Маршруты
 */
const router = useRouter()
/**
 * * Стор для управления игроками
 */
const playerStore = usePlayerStore()
const { pagination } = storeToRefs(playerStore)
const { getPlayers } = playerStore
/**
 * * Стор для управления командами
 */
const { getTeam } = useTeamStore()

/**
 * * Управление загрузкой
 */
const { isLoading, startLoading, stopLoading } = useLoading()
/**
 * * Поисковой запрос
 */
const search = ref('')
/**
 * * Список игроков
 */
const players = ref<PlayerModel[]>()
/**
 * * Первая загрузка
 */
const isFirstLoading = ref(false)
/**
 * * Выбранные Id команд
 */
const teamIds = ref<number[]>([])
/**
 * * Команды текущих игроков
 */
const playersTeams = ref<TeamModel[]>([])

/**
 * * Данные для запроса
 */
const filter = computed(
  () =>
    new FilterModel({
      Name: search.value,
      Pagination: pagination.value,
      TeamIds: teamIds.value,
    })
)

/**
 * * После рендера компонента
 */
onMounted(async () => {
  getPathQuery()
  updatePlayers()
  isFirstLoading.value = false
})

/**
 * * Обновить список команд
 */
async function updatePlayers() {
  startLoading()
  const response = await getPlayers(filter.value)
  if (response.IsSuccess) {
    players.value = response.Value
    await getPlayersTeams()
  }

  if (!players.value?.length && pagination.value.Page > 1) {
    pagination.value.Page = 1
    updatePlayers()
    return
  }

  setPathQuery()

  stopLoading()
}
/** Установка параметров в путь */
const setPathQuery = () => {
  const _query: any = pagination.value.Query
  if (search.value) _query.search = search.value
  if (teamIds.value?.length) _query.teamIds = teamIds.value.join()
  router.push({
    name: router.currentRoute.value.name,
    query: _query,
  })
}
/**
 * * Получение
 */
const getPathQuery = () => {
  const _query = router.currentRoute.value.query
  if (_query) {
    if (_query.page) pagination.value.Page = Number(_query.page) || 1
    if (_query.size) {
      const _size = Number(_query.size) || 6
      if (![6, 12, 24].includes(_size)) pagination.value.PageSize = 6
      else {
        pagination.value.PageSize = _size
      }
    }
    if (_query.search) search.value = _query.search?.toString()
    if (_query.teamIds)
      teamIds.value =
        _query.teamIds
          ?.toString()
          ?.split(',')
          ?.map((x) => Number(x))
          ?.filter((x) => !!x) || []
  }
}
/**
 * * Открытие страницы с созданием команды
 */
const openPlayerCreate = () => router.push({ name: 'player-control' })
/**
 * * Получение команд выводимых игроков
 */
const getPlayersTeams = async () => {
  playersTeams.value = []
  const teamsIds = Array.from(new Set(players.value.map((x) => x.Team)))
  teamsIds.forEach(async (id) => {
    const response = await getTeam(id)
    if (response.IsSuccess) playersTeams.value.push(response.Value)
  })
}
/**
 * * Получить имя команды
 */
const getTeamName = (_teamId: number) => {
  return playersTeams.value?.find((t) => t.Id == _teamId)?.Name || ''
}
</script>
<template>
  <Loader :is-loading="isLoading && isFirstLoading">
    <div class="players-page">
      <div class="players-page_filter">
        <Input
          v-model="search"
          placeholder="Search ..."
          is-search
          class="players-page_filter_field"
          @update:model-value="updatePlayers"
        />
        <TeamSelect
          v-model="teamIds"
          is-multi
          class="players-page_filter_field"
          @update:model-value="updatePlayers"
        />
        <Button
          class="players-page_filter_add"
          @click="openPlayerCreate"
        >
          Add
          <img
            :src="IconAdd"
            alt="add"
          />
        </Button>
      </div>
      <div class="players-page_block f">
        <Stopper v-if="!players?.length && !isLoading">
          <template #image>
            <img
              :src="PlayerEmpty"
              alt="empty"
            />
          </template>
          <template #text> Add new players to continue </template>
        </Stopper>
        <CardsList
          v-else
          isPlayers
          :items="players"
          :pagination="pagination"
          :is-loading="isLoading"
          @update="updatePlayers"
        >
          <template #title="slotProps">
            {{ (slotProps.item as PlayerModel)?.Name }}
            <span class="c-red">
              #{{ (slotProps.item as PlayerModel)?.Number }}
            </span>
          </template>
          <template #subtitle="slotProps">
            {{ getTeamName((slotProps.item as PlayerModel).Team) }}
          </template>
        </CardsList>
      </div>
    </div>
  </Loader>
</template>
<style lang="scss">
.players-page {
  display: flex;
  flex-direction: column;
  height: 100%;

  &_filter {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 24px;
    margin-bottom: 32px;

    button.players-page_filter_add {
      max-width: 100%;
    }

    @media (max-width: $small) {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 16px;
    }
  }

  &_block {
    height: 100%;
  }

  @media (max-width: $small) {
    padding: 0 12px !important;
  }
}
</style>
