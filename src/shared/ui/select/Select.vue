<script lang="ts" setup>
import {
  SelectOptionModel,
  ISelectProps,
  SelectedItem,
} from '@/shared/ui/select'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import IconExpand from '@/shared/assets/images/icons/icon-expand.svg'
import IconCloseSelect from '@/shared/assets/images/icons/icon-close-select.svg'

const props = withDefaults(defineProps<ISelectProps>(), {})
const emit = defineEmits<{
  (e: 'update:modelValue', values: number[]): void
}>()

/**
 * * Список открыт
 */
const opened = ref(false)
/**
 * * DOM элемент компонента
 */
const $select = ref<HTMLDivElement>()

/**
 * * Выбранные элементы
 */
const selectedOptions = computed(() =>
  props.options?.filter((o) => props.modelValue?.includes(o?.Id))
)
/**
 * * Установка и отправка значений
 */
const value = computed({
  get: () => selectedOptions.value?.map((o) => o?.Id),
  set: (_values) => {
    emit('update:modelValue', _values || [])
  },
})

/**
 * * После рендера компонента
 */
onMounted(() => {
  document.documentElement.addEventListener('click', documentOnClick)
})
/**
 * * Перед удалением компонента
 */
onUnmounted(() => {
  document.documentElement.removeEventListener('click', documentOnClick)
})

/**
 * * Переключение видимости списка
 */
const toggleSelect = (_opened?: boolean | null) => {
  opened.value = typeof _opened == 'boolean' ? _opened : !opened.value
}
/**
 * * Проверка клика мимо компонента
 */
function documentOnClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  const element = $select?.value
  if (target && element && target != element && !element.contains(target)) {
    toggleSelect(false)
  }
}
/**
 * * Проверить выбран ли элемент по Id
 * @param _id Id элемента
 */
const checkIdSelected = (_id: number) => props.modelValue?.includes(_id)
/**
 * * Получить классы элемента списка
 */
const getItemClasses = (_id: number) => ({
  selected: checkIdSelected(_id),
})
/**
 * * Переключение выбранного элемента
 */
const toggleItem = (_id: number) => {
  const isSelected = checkIdSelected(_id)

  if (props.isMulti) {
    if (isSelected) {
      value.value = props.modelValue?.filter((o) => o != _id)
    } else {
      value.value = [...(props.modelValue || []), _id]
    }
  } else {
    if (isSelected) {
      removeAll()
    } else {
      value.value = [_id]
    }
    toggleSelect(false)
  }
}
/**
 * * Удалить все элементы
 */
const removeAll = () => (value.value = [] as number[])
</script>
<template>
  <div
    ref="$select"
    class="select-wrapper"
  >
    <div
      v-if="label"
      v-text="label"
      class="select-wrapper_label"
    />
    <div
      class="select-wrapper_current"
      @click="toggleSelect(null)"
    >
      <div
        v-if="isMulti"
        class="select-wrapper_current_multi"
      >
        <SelectedItem
          v-for="option in selectedOptions"
          :key="option?.Id"
          :option="option"
          @delete="toggleItem"
        />
      </div>
      <span
        v-else
        v-text="selectedOptions?.[0]?.Text"
      />
      <div class="select-wrapper_current_toggler">
        <div
          v-if="modelValue?.length"
          class="select-wrapper_current_toggler_close"
          @click.stop
        >
          <img
            alt="icon-close"
            :src="IconCloseSelect"
            @click="removeAll"
          />
        </div>
        <img
          :src="IconExpand"
          :class="{ rotate: opened }"
          alt="icon-expand"
        />
      </div>
    </div>
    <div
      v-if="opened"
      class="select-wrapper_list"
    >
      <div
        v-for="option in options"
        v-text="option?.Text"
        class="select-wrapper_list_item"
        :class="getItemClasses(option?.Id)"
        :key="option?.Id"
        @click="toggleItem(option?.Id)"
      />
    </div>
  </div>
</template>
<style lang="scss">
.select-wrapper {
  width: 100%;
  position: relative;
  &_label {
    color: $grey;
    padding-bottom: $indent-1;
  }
  &_current {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    position: relative;
    outline: none;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: $dark-grey;
    background-color: $white;
    border: 0.5px solid $lightest-grey;
    border-radius: 4px;
    padding: 0 40px 0 $indent-2;
    transition: $transition-1;
    overflow: hidden;
    cursor: pointer;

    &_toggler {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      height: 24px;
      width: 40px;
      background-color: $white;
      border-left: 0.5px solid $lightest-grey;
      z-index: 1;

      img {
        transition: $transition-1;
        user-select: none;
        &.rotate {
          transform: rotate(180deg);
        }
      }

      &_close {
        position: absolute;
        cursor: default;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 100%;
        right: calc(100% + 1px);
        top: 0;
        background-color: $white;

        img {
          cursor: pointer;
        }
      }
    }

    &_multi {
      display: flex;
      gap: 4px;
    }
  }

  &_list {
    position: absolute;
    width: 100%;
    left: 0;
    top: calc(100% + 2px);
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    border: 0.5px solid $lightest-grey;
    background-color: $white;
    overflow: hidden;
    z-index: 10;

    &_item {
      display: flex;
      align-items: center;
      padding: 0 $indent-2;
      color: $light-grey;
      height: 40px;
      border-bottom: 0.5px solid $lightest-grey;
      transition: $transition-1;
      user-select: none;
      cursor: pointer;

      &:hover {
        color: $white;
        background-color: $lightest-red;
      }
      &:active,
      &.selected {
        color: $white;
        background-color: $dark-red;
      }

      &:last-child {
        border: none;
      }
    }
  }
}
</style>
