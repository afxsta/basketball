<script lang="ts" setup>
import { FilterModel, PaginationModel, useTeamStore } from '@/entities'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { ItemCard, Input, Select, Button } from '@/shared'
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
const { teams } = storeToRefs(teamStore)
const { getTeams } = teamStore

/**
 * * Поисковой запрос
 */
const search = ref('')

/**
 * * После рендера компонента
 */
onMounted(() => updateTeams())

const updateTeams = () => {
  getTeams(
    new FilterModel({
      Pagination: new PaginationModel({
        Page: 1,
        PageSize: 6,
      }),
    })
  )
}
/**
 * * Открытие страницы с созданием команды
 */
const openTeamCreate = () => router.push({ name: 'team-create' })
</script>
<template>
  <div class="teams-page">
    <div class="teams-page_filter">
      <Input
        v-model="search"
        placeholder="Search ..."
        is-search
        width="364px"
        @update:model-value="updateTeams"
      />
      <Select @update:model-value="updateTeams" />
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
    <ItemCard v-for="team in teams">
      <template #image>
        <img
          :src="team.Image?.toString()"
          alt="team-image"
        />
      </template>
      <template #title> {{ team.Name }} </template>
      <template #subtitle>
        Year of foundation: {{ team.FoundationYear }}
      </template>
    </ItemCard>
  </div>
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
