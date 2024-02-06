<script lang="ts" setup>
import {
  FilterModel,
  PaginationModel,
  PlayerModel,
  usePlayerStore,
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
 * * Стор для управления командами
 */
const playerStore = usePlayerStore()
const { pagination } = storeToRefs(playerStore)
const { getPlayers } = playerStore

/**
 * * Управление загрузкой
 */
const { isLoading, startLoading, stopLoading } = useLoading()
/**
 * * Поисковой запрос
 */
const search = ref('')
/**
 * * Список команд
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
  }
  stopLoading()
}
/**
 * * Открытие страницы с созданием команды
 */
const openPlayerCreate = () => router.push({ name: 'player-control' })
/**
 * * Открыть предпросмотр команды
 */
const openPlayer = (_id: number) => {
  router.push({
    name: 'player',
    params: { id: _id },
  })
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
          :items="players"
          :pagination="pagination"
          :is-loading="isLoading"
          @open="openPlayer"
          @update="updatePlayers"
        >
          <template #subtitle="slotProps">
            {{ (slotProps.item as PlayerModel)?.Name }}
            #{{ (slotProps.item as PlayerModel)?.Number }}
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
  max-width: 1140px;

  &_filter {
    display: flex;
    gap: 24px;
    margin-bottom: 32px;

    button.players-page_filter_add {
      margin-left: auto;
      max-width: 104px;
    }

    &_field {
      max-width: 364px;
    }

    @media (max-width: $small) {
      flex-direction: column;
      gap: 16px;
      margin-bottom: 16px;

      &_field,
      &_add {
        width: 100%;
        max-width: 100% !important;
      }
    }
  }

  &_block {
    height: 100%;
  }
}
</style>
