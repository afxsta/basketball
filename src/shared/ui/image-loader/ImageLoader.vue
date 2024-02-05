<script lang="ts" setup>
import { PropType, computed, onMounted, ref } from 'vue'
import IconAddImage from '@/shared/assets/images/icons/icon-add-image.svg'
import { watch } from 'vue'

/**
 * * Параметры компонента
 */
const props = defineProps({
  /**
   * * Выбранное изображение
   */
  modelValue: { type: (Object as PropType<File>) || String },
})
/**
 * * События компонента
 */
const emit = defineEmits(['update:modelValue'])

/**
 * * DOM элемент файл инпута
 */
const $fileInput = ref<HTMLInputElement>()
/**
 * * Ссылка на изображение
 */
const imageUrl = ref('')

/**
 * * Отслеживание изменений параметра modelValue
 */
watch(() => props.modelValue, onUpdateModelValue)

/**
 * * После рендера компонента
 */
onMounted(() => onUpdateModelValue())

/**
 * * При изменении параметра modelValue
 */
function onUpdateModelValue() {
  if (props.modelValue) setImageUrl(props.modelValue)
}
/**
 * * Открыть выбор файла, при клике по компоненту
 */
const onClick = () => $fileInput.value?.click()
/**
 * * При смене изображения
 */
const onChangeFile = (e: any) => {
  const _file = e?.target?.files?.[0] || ''
  setImageUrl(_file)
  emit('update:modelValue', _file)
}
/**
 * * Установка ссылки на изображение
 */
const setImageUrl = (_image: File | string) => {
  if (typeof _image == 'string') {
    imageUrl.value = _image
  } else {
    const reader = new FileReader()
    reader.onload = (event) =>
      (imageUrl.value = event.target.result?.toString())
    reader.readAsDataURL(_image)
  }
}
</script>
<template>
  <div
    class="image-loader"
    :class="{ empty: !imageUrl }"
    @click="onClick"
  >
    <img :src="imageUrl || IconAddImage" />
    <input
      v-show="false"
      ref="$fileInput"
      accept="image/*"
      type="file"
      @change="onChangeFile"
    />
  </div>
</template>
<style lang="scss" scoped>
.image-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 336px;
  max-height: 260px;
  background-color: $light-grey;
  border-radius: 10px;
  cursor: pointer;
  img {
    max-width: 100%;
    max-height: 100%;
  }
  &.empty {
    opacity: 0.5;
  }
}
</style>
