<script lang="ts" setup>
import { FilterModel, PaginationModel, useTeamStore } from '@/entities'
import { Select, ISelectProps, SelectOptionModel } from '@/shared'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { computed, ref } from 'vue'

/**
 * * Стор для управления командами
 */
const teamStore = useTeamStore()
const { pagination } = storeToRefs(teamStore)
const { getTeams } = teamStore

const props = defineProps<ISelectProps>()
const emit = defineEmits(['update:modelValue'])

/**
 * * Список команд для выбора
 */
const teamsOptions = ref<SelectOptionModel[]>([])

/**
 * * Поле для выбора команд
 */
const value = computed({
  get: () => props.modelValue,
  set: (_value) => emit('update:modelValue', _value),
})

/**
 * * После рендера компонента
 */
onMounted(async () => {
  await getTeamsOptions(true)
})

/**
 * * Получить список комнадл
 */
const getTeamsOptions = async (firstLoad?: boolean) => {
  if (!firstLoad && pagination.value.Count <= teamsOptions.value.length) return

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
</script>
<template>
  <Select
    v-model="value"
    :label="label"
    :options="teamsOptions"
    :is-multi="isMulti"
    @scroll-bottom="getTeamsOptions"
  />
</template>
<style lang="scss" scoped></style>
