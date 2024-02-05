<script lang="ts" setup>
import { PlayerModel, usePlayerStore } from '@/entities'
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
const playerStore = usePlayerStore()
const { getPlayer, deletePlayer } = playerStore

/**
 * * Данные о просматриваемой команде
 */
const player = ref(new PlayerModel())

/**
 * * Id команды
 */
const playerId = computed(() => Number(router.currentRoute.value?.params?.id))

/**
 * * После рендера компонента
 */
onMounted(async () => await loadPlayer())

/**
 * * Запрос на получение команды
 */
const loadPlayer = async () => {
  const response = await getPlayer(playerId.value)
  if (response.IsSuccess) {
    player.value = response.Value
  } else {
    router.push({ name: 'main' })
  }
}
/**
 * * Запрос на редактирование команды
 */
const editPlayer = (_id: number) => {}
</script>
<template>
  <div class="player-page">
    <div class="player-page-wrapper">
      <PageHeader
        :paths="['Players', player.Name]"
        @delete="deletePlayer(player.Id)"
        @edit="editPlayer(player.Id)"
      />
      <div
        v-if="player"
        class="player-page_info-block"
      >
        <div class="player-page_info-block_image">
          <img
            v-if="player.Image"
            :src="player.Image.toString()"
            alt="player-image"
          />
        </div>
        <div class="player-page_info-block_data">
          <div class="player-page_info-block_data_title">
            {{ player.Name }} #{{ player.Number }}
          </div>
          <div class="player-page_info-block_data_description">
            <div class="player-page_info-block_data_description_item">
              <div class="player-page_info-block_data_description_item_title">
                Position
              </div>
              <div class="player-page_info-block_data_description_item_text">
                {{ player.Position }}
              </div>
            </div>
            <div class="player-page_info-block_data_description_item">
              <div class="player-page_info-block_data_description_item_title">
                Team
              </div>
              <div class="player-page_info-block_data_description_item_text">
                {{ player.Team }}
              </div>
            </div>
            <div class="player-page_info-block_data_description_item">
              <div class="player-page_info-block_data_description_item_title">
                Height
              </div>
              <div class="player-page_info-block_data_description_item_text">
                {{ player.Height }}
              </div>
            </div>
            <div class="player-page_info-block_data_description_item">
              <div class="player-page_info-block_data_description_item_title">
                Weight
              </div>
              <div class="player-page_info-block_data_description_item_text">
                {{ player.Weight }}
              </div>
            </div>
            <div class="player-page_info-block_data_description_item">
              <div class="player-page_info-block_data_description_item_title">
                Age
              </div>
              <div class="player-page_info-block_data_description_item_text">
                {{ player.Age }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.player-page {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  .player-page-wrapper {
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
