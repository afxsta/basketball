<script lang="ts" setup>
import { PlayerModel, TeamModel } from '@/entities'
import { ITeamRosterProps } from '@/features'
import { Avatar } from '@/shared'
import { computed, ref } from 'vue'

/**
 * * Параметры компонента
 */
const props = defineProps<ITeamRosterProps>()

/**
 * * Выбранное поле сортировки
 */
const selectedSortKey = ref<keyof PlayerModel>('Number')
/**
 * * Обратная сортировка
 */
const reversedSort = ref(false)

/**
 * * Отсортированный состав команды
 */
const sortedRoster = computed(() =>
  props.roster?.sort((a: any, b: any) =>
    reversedSort.value
      ? a[selectedSortKey.value] - b[selectedSortKey.value]
      : b[selectedSortKey.value] - a[selectedSortKey.value]
  )
)

/**
 * * Выбор типа сортировки
 */
const selectSort = (key: keyof PlayerModel) => {
  if (selectedSortKey.value == key) {
    reversedSort.value = !reversedSort.value
  } else {
    selectedSortKey.value = key
    reversedSort.value = false
  }
}
/**
 * * Получение классов элемента заголовка
 */
const getHeaderItemClass = (key: keyof PlayerModel) => ({
  current: key == selectedSortKey.value,
  reverse: reversedSort.value,
})
</script>
<template>
  <div class="team-roster">
    <div class="team-roster_title">Roster</div>
    <div class="team-roster_item header">
      <div
        :class="getHeaderItemClass('Number')"
        @click="selectSort('Number')"
      >
        #
      </div>
      <div
        :class="getHeaderItemClass('Name')"
        @click="selectSort('Name')"
        class="team-roster_item_block"
      >
        Player
      </div>
      <div
        :class="getHeaderItemClass('Height')"
        @click="selectSort('Height')"
      >
        Height
      </div>
      <div
        :class="getHeaderItemClass('Weight')"
        @click="selectSort('Weight')"
      >
        Weight
      </div>
      <div
        :class="getHeaderItemClass('Age')"
        @click="selectSort('Age')"
      >
        Age
      </div>
    </div>
    <div
      v-for="player in sortedRoster"
      :key="player.Id"
      class="team-roster_item"
    >
      <div>{{ player.Number || '-' }}</div>
      <div class="team-roster_item_block">
        <Avatar
          :image="player.Image?.toString()"
          size="40px"
        />
        <div class="team-roster_item_block_info">
          <div v-text="player.Name" />
          <div
            v-text="player.Position"
            class="team-roster_item_block_info_position"
          />
        </div>
      </div>
      <div v-text="`${player.Height} cm`" />
      <div v-text="`${player.Weight} kg`" />
      <div
        v-text="player.Age"
        @click="selectSort('Age')"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.team-roster {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.5px solid $light-grey;
  border-radius: 10px;
  background-color: $white;
  overflow: hidden;
  color: $grey;

  &_title {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 22px;
    height: 54px;
    border-bottom: 0.5px solid $light-grey;
    font-size: 18px;
  }

  &_item {
    display: grid;
    grid-template-columns: 36px 1fr 66px 66px 36px;
    align-items: center;
    width: 100%;
    gap: 84px;
    padding: 0 22px;
    min-height: 56px;
    border-bottom: 0.5px solid $light-grey;

    &:last-child {
      border-bottom: none;
    }

    &.header {
      min-height: 40px;
      user-select: none;

      & > div {
        cursor: pointer;
        position: relative;

        &.current {
          &::before {
            content: '';
            background: url('@/shared/assets/images/icons/icon-expand.svg')
              center/cover no-repeat;
            position: absolute;
            height: 10px;
            width: 10px;
            left: -14px;
            top: 50%;
            transform: translateY(-50%);
            transition: $transition-1;
          }

          &.reverse {
            &::before {
              transform: translateY(-50%) rotate(-180deg);
            }
          }
        }
      }
    }

    &_block {
      display: flex;
      gap: 16px;
      margin-left: -54px;

      &_info {
        display: flex;
        flex-direction: column;
        line-height: 21px;

        &_position {
          font-size: 12px;
          color: $light-grey;
        }
      }
    }
  }
}
</style>
