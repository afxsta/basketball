<script lang="ts" setup>
import {
  FilterModel,
  PaginationModel,
  TeamModel,
  useTeamStore,
} from "@/entities"
import { storeToRefs } from "pinia"
import { computed, onMounted, ref } from "vue"
import { Input, Button, Loader, Stopper } from "@/shared"
import { useLoading } from "@/shared/composables/loading/use-loading"
import { CardsList } from "@/features"
import IconAdd from "@/shared/assets/images/icons/icon-add.svg"
import { useRouter } from "vue-router"
import TeamEmpty from "@/shared/assets/images/team-empty.svg"

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
const search = ref("")
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
  getPathQuery()
  updateTeams()
  isFirstLoading.value = false
})

/**
 * * Обновить список команд
 */
async function updateTeams() {
  startLoading()
  const response = await getTeams(filter.value)
  if (response.IsSuccess) {
    teams.value = response.Value
  }

  if (!teams.value?.length && pagination.value.Page > 1) {
    pagination.value.Page = 1
    updateTeams()
    return
  }

  setPathQuery()

  stopLoading()
}
/** Установка параметров в путь */
const setPathQuery = () => {
  const _query: any = pagination.value.Query
  if (search.value) _query.search = search.value
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
  }
}
/**
 * * Открытие страницы с созданием команды
 */
const openTeamCreate = () => router.push({ name: "team-control" })
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
          @update:model-value="updateTeams"
        />
        <div class="teams-page_filter_empty" />
        <Button class="teams-page_filter_add" @click="openTeamCreate">
          Add
          <img :src="IconAdd" alt="add" />
        </Button>
      </div>
      <div class="teams-page_block f">
        <Stopper v-if="!teams?.length && !isLoading">
          <template #image>
            <img :src="TeamEmpty" alt="empty" />
          </template>
          <template #text> Add new teams to continue </template>
        </Stopper>
        <CardsList
          v-else
          :items="teams"
          :pagination="pagination"
          :is-loading="isLoading"
          @update="updateTeams"
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

  &_filter {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 32px;

    button.teams-page_filter_add {
      max-width: 104px;
      margin-left: auto;
    }

    @media (max-width: $small) {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 16px;

      &_empty {
        display: none;
      }

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

  @media (max-width: $small) {
    padding: 0 12px !important;
  }

  @media (max-width: $tablet) {
    .teams-page_filter {
      grid-template-columns: repeat(2, 1fr);
      .teams-page_filter_empty {
        display: none;
      }
    }
  }
}
</style>
