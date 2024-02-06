<script lang="ts" setup>
import { TeamModel, useTeamStore } from '@/entities'
import { Input, Button, useFormValidation, ValidationModel } from '@/shared'
import { ImageLoader } from '@/features'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

/**
 * * Маршруты
 */
const router = useRouter()
/**
 * * Данные об игроке
 */
const team = ref(new TeamModel())
/**
 * * Стор для управления игроками
 */
const teamStore = useTeamStore()
const { updateTeam, getTeam } = teamStore

/**
 * * Использование валидации
 */
const { validation, checkAsBoolean, checkPositiveNumber, startValidate } =
  useFormValidation()

/**
 * * Настройки валидации
 */
const validationOptions = computed(() => [
  new ValidationModel({
    Key: 'Name',
    Error: 'Field available',
    Value: team.value.Name,
    Condition: checkAsBoolean,
  }),
  new ValidationModel({
    Key: 'Division',
    Error: 'Field available',
    Value: team.value.Division,
    Condition: checkAsBoolean,
  }),
  new ValidationModel({
    Key: 'Conference',
    Error: 'Field available',
    Value: team.value.Conference,
    Condition: checkAsBoolean,
  }),
  new ValidationModel({
    Key: 'FoundationYear',
    Error: 'Wrong value',
    Value: team.value.FoundationYear,
    Condition: checkPositiveNumber,
  }),
])

/**
 * * Id редактируемой команды
 */
const teamId = computed(() => Number(router.currentRoute.value?.params?.id))

/**
 * * После рендера компонента
 */
onMounted(async () => {
  if (teamId.value) {
    const response = await getTeam(teamId.value)
    if (response.IsSuccess) {
      team.value = response.Value
    }
  }
})

/**
 * * Отмена редактирования игрока
 */
const cancelEdit = () => {
  if (teamId.value) {
    router.push({ name: 'team', params: { id: teamId.value } })
  } else {
    router.push({ name: 'teams' })
  }
}
/**
 * * Отправка запроса на сохранение команды
 */
const saveTeam = async () => {
  if (startValidate(validationOptions.value)) {
    const response = await updateTeam(team.value)
    if (response.IsSuccess) {
      router.push({ name: 'team', params: { id: response.Value?.Id } })
    }
  }
}
</script>
<template>
  <div class="team-edit-page">
    <ImageLoader
      v-model="team.Image"
      class="team-edit-page_image"
    />
    <div class="team-edit-page_form">
      <Input
        v-model="team.Name"
        :error="validation.Name"
        label="Name"
      />
      <Input
        v-model="team.Division"
        :error="validation.Division"
        label="Division"
      />
      <Input
        v-model="team.Conference"
        :error="validation.Conference"
        label="Conference"
      />
      <Input
        v-model="team.FoundationYear"
        :error="validation.FoundationYear"
        label="Year of foundation"
        type="number"
      />
      <div class="team-edit-page_form_row">
        <Button
          secondary
          @click="cancelEdit"
        >
          Cancel
        </Button>
        <Button @click="saveTeam"> Save </Button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.team-edit-page {
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

  @media (max-width: 1140px) {
    padding: 48px 24px;
  }

  @media (max-width: 868px) {
    flex-direction: column;
    align-items: center;
    gap: 48px;

    .team-edit-page_image {
      width: 185px;
    }
  }
}
</style>
