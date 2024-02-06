<script lang="ts" setup>
import {
  FilterModel,
  PaginationModel,
  TeamModel,
  useTeamStore,
} from '@/entities'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { Input, Button, Loader, Stopper } from '@/shared'
import { useLoading } from '@/shared/composables/loading/use-loading'
import { CardsList } from '@/features'
import IconAdd from '@/shared/assets/images/icons/icon-add.svg'
import { useRouter } from 'vue-router'
import TeamEmpty from '@/shared/assets/images/team-empty.svg'

/**
 * * Маршруты
 */
const router = useRouter()
/**
 * * Стор для управления командами
 */
const teamStore = useTeamStore()
const { pagination } = storeToRefs(teamStore)
const { getTeams } = teamStore

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
const teams = ref<TeamModel[]>()
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
  updateTeams()
  isFirstLoading.value = false
})

/**
 * * Обновить список команд
 */
const updateTeams = async (withReset?: boolean) => {
  if (withReset) {
    isFirstLoading.value = true
    pagination.value = new PaginationModel()
  }

  startLoading()
  const response = await getTeams(filter.value)
  if (response.IsSuccess) {
    teams.value = response.Value
  }
  stopLoading()
}
/**
 * * Открытие страницы с созданием команды
 */
const openTeamCreate = () => router.push({ name: 'team-control' })
/**
 * * Открыть предпросмотр команды
 */
const openTeam = (_id: number) => {
  router.push({
    name: 'team',
    params: { id: _id },
  })
}
/**
 * * Смена страницы
 */
const changePage = (_page: number) => {
  pagination.value.Page = _page
  updateTeams()
}
</script>
<template>
  <Loader :is-loading="isLoading && isFirstLoading">
    <div class="teams-page">
      <div class="teams-page_filter">
        <Input
          v-model="search"
          placeholder="Search ..."
          is-search
          class="teams-page_filter_field"
          @update:model-value="updateTeams(true)"
        />
        <Button
          class="teams-page_filter_add"
          @click="openTeamCreate"
        >
          Add
          <img
            :src="IconAdd"
            alt="add"
          />
        </Button>
      </div>
      <div class="teams-page_block f">
        <Stopper v-if="!teams?.length && !isLoading">
          <template #image>
            <img
              :src="TeamEmpty"
              alt="empty"
            />
          </template>
          <template #text> Add new teams to continue </template>
        </Stopper>
        <CardsList
          v-else
          :items="teams"
          :pagination="pagination"
          :is-loading="isLoading"
          @open="openTeam"
          @page="changePage"
        >
          <template #subtitle="slotProps">
            Year of foundation:
            {{ (slotProps.item as TeamModel)?.FoundationYear }}
          </template>
        </CardsList>
      </div>
    </div>
  </Loader>
</template>
<style lang="scss">
.teams-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1140px;

  &_filter {
    display: flex;
    gap: 24px;
    margin-bottom: 32px;

    button.teams-page_filter_add {
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
