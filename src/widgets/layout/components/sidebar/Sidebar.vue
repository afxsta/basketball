<script lang="ts" setup>
import { GeneralModel } from '@/entities'
import { computed, ref } from 'vue'
import IconPerson from '@/shared/assets/images/icons/group_person_rounded.svg'
import IconPersonGroup from '@/shared/assets/images/icons/person_rounded.svg'
import IconExit from '@/shared/assets/images/icons/icon-exit.svg'
import { useAuthStore } from '@/entities'
import { useRouter } from 'vue-router'
import { UserInfo } from '@/widgets'
import { storeToRefs } from 'pinia'
/**
 * * Маршруты
 */
const router = useRouter()
/**
 * * Стор для управления текущим аккаунтом
 */
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const { leaveAccount } = authStore

/**
 * * Сайдбар открыт
 */
const opened = ref(false)
/**
 * * Id текущего hover элемента
 */
const currentHover = ref()

/**
 * * Элементы сайдбара
 */
const items = computed(() => [
  new GeneralModel({ Id: 1, Name: 'Teams', Image: IconPersonGroup }),
  new GeneralModel({ Id: 2, Name: 'Players', Image: IconPerson }),
])
/**
 * * Классы компонента
 */
const componentClasses = computed(() => ['sidebar', { opened: opened.value }])

/**
 * * Получение svg рисунка
 */
const getSvgDraw = (_id: number) => {
  switch (_id) {
    case 1:
      return 'M7.32675 5.33325C7.32675 6.43992 6.44008 7.33325 5.33341 7.33325C4.22675 7.33325 3.33341 6.43992 3.33341 5.33325C3.33341 4.22659 4.22675 3.33325 5.33341 3.33325C6.44008 3.33325 7.32675 4.22659 7.32675 5.33325ZM12.6601 5.33325C12.6601 6.43992 11.7734 7.33325 10.6667 7.33325C9.56008 7.33325 8.66675 6.43992 8.66675 5.33325C8.66675 4.22659 9.56008 3.33325 10.6667 3.33325C11.7734 3.33325 12.6601 4.22659 12.6601 5.33325ZM5.33341 8.66659C3.78008 8.66659 0.666748 9.44659 0.666748 10.9999V11.9999C0.666748 12.3666 0.966748 12.6666 1.33341 12.6666H9.33341C9.70008 12.6666 10.0001 12.3666 10.0001 11.9999V10.9999C10.0001 9.44659 6.88675 8.66659 5.33341 8.66659ZM10.0201 8.69992C10.2534 8.67992 10.4734 8.66659 10.6667 8.66659C12.2201 8.66659 15.3334 9.44659 15.3334 10.9999V11.9999C15.3334 12.3666 15.0334 12.6666 14.6667 12.6666H11.2134C11.2867 12.4599 11.3334 12.2333 11.3334 11.9999V10.9999C11.3334 10.0199 10.8067 9.27992 10.0467 8.72659C10.0447 8.72457 10.0427 8.72194 10.0405 8.71907C10.0354 8.71246 10.0294 8.70457 10.0201 8.69992Z'
    case 2:
      return 'M10.6667 5.33341C10.6667 6.80675 9.47342 8.00008 8.00008 8.00008C6.52675 8.00008 5.33341 6.80675 5.33341 5.33341C5.33341 3.86008 6.52675 2.66675 8.00008 2.66675C9.47342 2.66675 10.6667 3.86008 10.6667 5.33341ZM2.66675 12.0001C2.66675 10.2267 6.22008 9.33341 8.00008 9.33341C9.78008 9.33341 13.3334 10.2267 13.3334 12.0001V12.6667C13.3334 13.0334 13.0334 13.3334 12.6667 13.3334H3.33341C2.96675 13.3334 2.66675 13.0334 2.66675 12.6667V12.0001Z'
  }
}
/**
 * * Получение цвета картинки
 */
const getItemColor = (_id: number) => {
  const routeName = _id == 1 ? 'team' : 'player'
  const active = router.currentRoute.value?.name
    ?.toString()
    ?.includes(routeName)

  if (active) return '#e4163a'
  if (_id == currentHover.value) return '#ff5761'
  return '#9C9C9C'
}
/**
 * * Установка текущего hover значения
 */
const setCurrentHover = (_id: number) => (currentHover.value = _id)
/**
 * * Получить имя роута
 */
const getRouteName = (_id: number) => {
  switch (_id) {
    case 1:
      return { name: 'teams' }
    case 2:
      return { name: 'players' }
  }
}
/**
 * * Открыть сайдбар
 */
const toggle = () => (opened.value = !opened.value)

/**
 * * Код для использования по ref
 */
defineExpose({
  toggle,
})
</script>
<template>
  <div :class="componentClasses">
    <div class="sidebar_user">
      <UserInfo :info="user" />
    </div>
    <RouterLink
      v-for="item in items"
      :key="item?.Id"
      :to="getRouteName(item?.Id)"
      class="sidebar_link"
    >
      <div
        class="sidebar_item"
        @mouseenter="setCurrentHover(item?.Id)"
        @mouseleave="setCurrentHover(undefined)"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 16 16"
        >
          <path
            :d="getSvgDraw(item?.Id)"
            :fill="getItemColor(item?.Id)"
          />
        </svg>
        <span
          v-text="item?.Name"
          class="sidebar_item_name"
          :style="{ color: getItemColor(item?.Id) }"
        />
      </div>
    </RouterLink>
    <div
      class="sidebar_sign-out"
      @click="leaveAccount"
    >
      <img
        :src="IconExit"
        alt="exit"
      />
      <span>Sign out</span>
    </div>
  </div>
  <div
    class="sidebar_background"
    :class="{ opened: opened }"
    @click="toggle"
  />
</template>
<style lang="scss">
.sidebar {
  position: fixed;
  left: 0;
  top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 32px 0;
  width: 140px;
  height: calc(100% - 80px);
  background-color: $white;
  transition: $transition-1;
  z-index: 100;

  &_user {
    display: none;
  }

  &_link {
    text-decoration: none;
  }

  &_item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    cursor: pointer;

    path {
      transition: $transition-1;
    }

    &_name {
      font-size: 12px;
      line-height: 18px;
      transition: $transition-1;
    }
  }
  &_sign-out {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: auto;
    gap: 4px;
    color: $lightest-red;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    cursor: pointer;
  }

  @media (max-width: $small) {
    padding: 0 0 20px;
    width: 200px;
    align-items: start;
    top: 62px;
    height: calc(100% - 62px);

    &:not(.opened) {
      left: -200px;
    }

    &_item,
    &_sign-out {
      flex-direction: row;
      padding: 0 20px;
    }

    &_user {
      display: flex;
      justify-content: center;
      border-bottom: 0.5px solid $light-grey;
      width: 100%;
      height: 80px;

      .user-info {
        flex-direction: row-reverse;
        gap: 12px;
        max-height: fit-content;

        &_image {
          width: 40px;
          height: 40px;
        }
        &_name {
          font-size: 15px;
        }
      }
    }
  }
}
.sidebar_background {
  display: none;
  opacity: 0;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #414141;
  opacity: 0.6;
  z-index: 99;
  transition: $transition-1;

  &.opened {
    display: block;
  }
}
</style>
