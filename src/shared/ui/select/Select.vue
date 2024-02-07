<script lang="ts" setup>
import {
  ISelectProps,
  SelectedItem,
  ErrorMessage,
  SelectOptionModel,
} from '@/shared'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import IconExpand from '@/shared/assets/images/icons/icon-expand.svg'
import IconCloseSelect from '@/shared/assets/images/icons/icon-close-select.svg'
import { watch } from 'vue'
import { nextTick } from 'vue'

const props = withDefaults(defineProps<ISelectProps>(), {})
const emit = defineEmits<{
  /**
   * * Отправка выбранного значения
   */
  (e: 'update:modelValue', values: number[]): void
  /**
   * * При прокрутке списка в самый конец
   */
  (e: 'scroll-bottom'): void
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
 * * Список компонентов представляющих мультиселект
 */
const $selectedItem = ref<InstanceType<typeof SelectedItem>[]>([])
/**
 * * Максимально количество отображаемых мультиселект блоков
 */
const maxItems = ref<number>()
/**
 * * DOM элемент тогглера
 */
const $toggler = ref<HTMLDivElement>()
/**
 * * Опция для отображения заглушки
 */
const plugOption = ref(
  new SelectOptionModel({ Id: new Date().getTime(), Text: '...' })
)

/**
 * * Видна заглушка multi режима
 */
const visibleMultiPlug = computed(
  () => selectedOptions.value?.length > maxItems.value
)
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
 * * Классы current элемента
 */
const currentBlockClasses = computed(() => [
  'select-wrapper_current',
  { error: !!props.error },
  { multi: props.isMulti || props.isWhite },
])

/**
 * * Отслеживание изменений выбранных элементов
 */
watch(selectedOptions, onUpdateSelectedOptions, { deep: true })

/**
 * * После рендера компонента
 */
onMounted(() => {
  document.documentElement.addEventListener('click', documentOnClick)
  onUpdateSelectedOptions()
})
/**
 * * Перед удалением компонента
 */
onUnmounted(() => {
  document.documentElement.removeEventListener('click', documentOnClick)
})

/**
 * * При обновлении выбранных опций
 */
async function onUpdateSelectedOptions() {
  if (!props.isMulti) return

  await nextTick()

  const selectedLength = selectedOptions.value?.length
  if (maxItems.value <= selectedLength) {
    return
  } else {
    maxItems.value = undefined
    await nextTick()
  }

  const rects = $selectedItem.value
    ?.map((item) => item?.$el?.getBoundingClientRect())
    ?.filter((item) => !!item)
  const togglerRect = $toggler.value?.getBoundingClientRect()

  if (togglerRect && rects?.length) {
    const togglerLeft = togglerRect.left

    const lastItem = rects.findIndex((rect) => rect.right + 80 >= togglerLeft)
    maxItems.value = lastItem == -1 ? undefined : selectedLength - 1
    return
  }
}
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
/**
 * * При скролле списка
 */
const listOnScroll = (e: Event) => {
  const target = e.target as HTMLDivElement
  const _bottom = target.scrollHeight - target.clientHeight - target.scrollTop
  if (_bottom <= 0) emit('scroll-bottom')
}
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
    <ErrorMessage>
      <div
        :class="currentBlockClasses"
        @click="toggleSelect(null)"
      >
        <div
          v-if="isMulti"
          class="select-wrapper_current_multi"
        >
          <SelectedItem
            v-for="(option, index) in selectedOptions"
            v-show="index < maxItems || !maxItems"
            :key="option?.Id"
            :option="option"
            ref="$selectedItem"
            @delete="toggleItem"
          />
          <SelectedItem
            v-if="visibleMultiPlug"
            hide-delete
            :option="plugOption"
          />
        </div>
        <span
          v-else
          v-text="selectedOptions?.[0]?.Text"
        />
        <div
          class="select-wrapper_current_toggler"
          ref="$toggler"
        >
          <div
            v-if="modelValue?.length && isMulti"
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
      <template #error>
        {{ error }}
      </template>
    </ErrorMessage>
    <div
      v-if="opened"
      class="select-wrapper_list"
      :class="{ above: above }"
      @scroll="listOnScroll"
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
    background-color: $lightest-grey1;
    border: 0.5px solid transparent;
    border-radius: 4px;
    padding: 0 40px 0 $indent-2;
    transition: $transition-1;
    overflow: hidden;
    cursor: pointer;

    &.error {
      border-color: $lightest-red;
    }

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
      background-color: $lightest-grey1;
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
        background-color: $lightest-grey1;

        img {
          cursor: pointer;
        }
      }
    }

    &.multi {
      background-color: $white;
      border-color: $lightest-grey;

      .select-wrapper_current_toggler {
        border-left: 1px solid $lightest-grey;
      }

      .select-wrapper_current_toggler,
      .select-wrapper_current_toggler_close {
        background-color: $white;
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
    max-height: 220px;
    left: 0;
    top: calc(100% + 2px);
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    border: 0.5px solid $lightest-grey;
    background-color: $white;
    overflow-y: scroll;
    z-index: 10;

    &.above {
      top: unset;
      bottom: calc(100% + 2px);
    }

    &_item {
      display: flex;
      align-items: center;
      padding: 0 $indent-2;
      color: $light-grey;
      min-height: 40px;
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
