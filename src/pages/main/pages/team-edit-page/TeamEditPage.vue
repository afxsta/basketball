<script lang="ts" setup>
import { TeamModel, useTeamStore } from '@/entities'
import { Input, Select, Button, DatePicker, ImageLoader } from '@/shared'
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
const team = ref(new TeamModel())
/**
 * * Стор для управления игроками
 */
const teamStore = useTeamStore()
const { addTeam } = teamStore

/**
 * * После рендера компонента
 */
onMounted(() => {})

/**
 * * Отмена редактирования игрока
 */
const cancelEdit = () => router.push({ name: 'players' })
/**
 * * Отправка запроса на сохранение игрока
 */
const saveTeam = async () => {
  const response = await addTeam(team.value)
  console.log(response)
}
</script>
<template>
  <div class="team-edit-page">
    <ImageLoader v-model="team.Image" />
    <div class="team-edit-page_form">
      <Input
        v-model="team.Name"
        label="Name"
      />
      <Input
        v-model="team.Division"
        label="Division"
      />
      <Input
        v-model="team.Conference"
        label="Conference"
      />
      <Input
        v-model="team.FoundationYear"
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
  background-color: var(--white);
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
