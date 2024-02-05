<script lang="ts" setup>
import {
  FilterModel,
  PaginationModel,
  PlayerModel,
  usePlayerStore,
} from '@/entities'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { Input, Button, Loader } from '@/shared'
import { useLoading } from '@/shared/composables/loading/use-loading'
import { CardsList } from '@/features'
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
 * * Данные для запроса
 */
const filter = computed(
  () =>
    new FilterModel({
      Name: search.value,
      Pagination: pagination.value,
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
const updatePlayers = async (withReset?: boolean) => {
  if (withReset) {
    isFirstLoading.value = true
    pagination.value = new PaginationModel()
  }

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
const openPlayerCreate = () => router.push({ name: 'player-create' })
/**
 * * Открыть предпросмотр команды
 */
const openPlayer = (_id: number) => {
  router.push({
    name: 'player',
    params: { id: _id },
  })
}
/**
 * * Смена страницы
 */
const changePage = (_page: number) => {
  pagination.value.Page = _page
  updatePlayers()
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
          width="364px"
          @update:model-value="updatePlayers(true)"
        />
        <Button
          class="players-page_filter_add"
          width="104px"
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
        <Stopper v-if="!players?.length">
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
          :pagesCount="1"
          :pagination="pagination"
          :is-loading="isLoading"
          @open="openPlayer"
          @page="changePage"
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

  &_filter {
    display: flex;
    gap: 24px;
    margin-bottom: 32px;
    &_add {
      margin-left: auto;
    }
  }

  &_block {
    height: 100%;
  }
}
</style>
