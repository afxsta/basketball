<script lang="ts" setup>
import { TeamModel, useTeamStore } from '@/entities'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'
import { ref } from 'vue'
import { PageHeader } from '@/features'
import { useRouter } from 'vue-router'

/**
 * * Маршруты
 */
const router = useRouter()
/**
 * * Стор для управления командами
 */
const teamStore = useTeamStore()
const { getTeam, deleteTeam } = teamStore

/**
 * * Данные о просматриваемой команде
 */
const team = ref(new TeamModel())

/**
 * * Id команды
 */
const teamId = computed(() => Number(router.currentRoute.value?.params?.id))

/**
 * * После рендера компонента
 */
onMounted(async () => await loadTeam())

/**
 * * Запрос на получение команды
 */
const loadTeam = async () => {
  const response = await getTeam(teamId.value)
  if (response.IsSuccess) {
    team.value = response.Value
  } else {
    router.push({ name: 'main' })
  }
}
/**
 * * Запрос на редактирование команды
 */
const editTeam = () => {}
/**
 * * Отправка запроса на удаление команды
 */
const sendDeleteRequest = async () => {
  const response = await deleteTeam(team.value.Id)
  if (response.IsSuccess) router.push({ name: 'teams' })
}
</script>
<template>
  <div class="team-page">
    <div class="team-page-wrapper">
      <PageHeader
        :paths="['Teams', team.Name]"
        @delete="sendDeleteRequest"
        @edit="editTeam"
      />
      <div
        v-if="team"
        class="team-page_info-block"
      >
        <div class="team-page_info-block_image">
          <img
            v-if="team.Image"
            :src="team.Image.toString()"
            alt="team-image"
          />
        </div>
        <div class="team-page_info-block_data">
          <div
            v-text="team.Name"
            class="team-page_info-block_data_title"
          />
          <div class="team-page_info-block_data_description">
            <div class="team-page_info-block_data_description_item">
              <div class="team-page_info-block_data_description_item_title">
                Year of foundation
              </div>
              <div class="team-page_info-block_data_description_item_text">
                {{ team.FoundationYear }}
              </div>
            </div>
            <div class="team-page_info-block_data_description_item">
              <div class="team-page_info-block_data_description_item_title">
                Division
              </div>
              <div class="team-page_info-block_data_description_item_text">
                {{ team.Division }}
              </div>
            </div>
            <div class="team-page_info-block_data_description_item">
              <div class="team-page_info-block_data_description_item_title">
                Conference
              </div>
              <div class="team-page_info-block_data_description_item_text">
                {{ team.Conference }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.team-page {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  .team-page-wrapper {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    overflow: hidden;
  }

  &_info-block {
    display: flex;
    background: linear-gradient(276.45deg, #707070 0%, #393939 100.28%);
    width: 100%;
    min-height: 404px;
    &_image {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px;
      max-width: 500px;
      min-height: 100%;
      width: 100%;
      img {
        border-radius: 4px;
        max-width: 100%;
        height: auto;
      }
    }
    &_data {
      padding: 65px 65px 65px 0;
      &_title {
        font-size: 36px;
        line-height: 50px;
        font-weight: 800;
        color: $white;
        margin-bottom: 40px;
      }
      &_description {
        display: flex;
        flex-wrap: wrap;
        row-gap: 54px;
        column-gap: 84px;
        &_item {
          display: flex;
          flex-direction: column;
          gap: 8px;
          color: $white;

          &_title {
            font-size: 24px;
            font-weight: 800;
            line-height: 32px;
          }
          &_text {
            font-size: 18px;
            font-weight: 500;
            line-height: 25px;
          }
        }
      }
    }
  }
}
</style>
