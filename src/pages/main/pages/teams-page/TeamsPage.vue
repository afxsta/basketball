<script lang="ts" setup>
import {
  FilterModel,
  PaginationModel,
  TeamModel,
  useTeamStore,
} from '@/entities'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { Input, Button, Loader } from '@/shared'
import { useLoading } from '@/shared/composables/loading/use-loading'
import { CardsList } from '@/features'
import IconAdd from '@/shared/assets/images/icons/icon-add.svg'
import { useRouter } from 'vue-router'

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
const openTeamCreate = () => router.push({ name: 'team-create' })
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
          width="364px"
          @update:model-value="updateTeams(true)"
        />
        <Button
          class="teams-page_filter_add"
          width="104px"
          @click="openTeamCreate"
        >
          Add
          <img
            :src="IconAdd"
            alt="add"
          />
        </Button>
      </div>
      <div class="f">
        <CardsList
          :items="teams"
          :pagesCount="1"
          :pagination="pagination"
          :is-loading="isLoading"
          @open="openTeam"
          @page="changePage"
        >
          <!-- pagination -->
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

  &_filter {
    display: flex;
    gap: 24px;
    margin-bottom: 32px;
    &_add {
      margin-left: auto;
    }
  }
}
</style>
