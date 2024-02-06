<script lang="ts" setup>
import { PropType, onMounted, ref } from 'vue'
import IconAddImage from '@/shared/assets/images/icons/icon-add-image.svg'
import { watch } from 'vue'
import { useNotificationStore } from '@/entities'

/**
 * * Стор уведомлений
 */
const { sendNotification } = useNotificationStore()

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
  if (validateImage(_file)) {
    setImageUrl(_file)
    emit('update:modelValue', _file)
  }
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
/**
 * * Функция для валидации изображения
 * @param file Файл изображения
 */
const validateImage = (file: File) => {
  if (!file) return false

  if (!file.type.startsWith('image/')) {
    sendNotification('The selected file is not an image')
    return false
  }

  const maxSizeInBytes = 100 * 1024 * 1024
  if (file.size > maxSizeInBytes) {
    sendNotification('File size exceeds 100 megabytes')
    return false
  }

  return true
}
</script>
<template>
  <div
    class="image-loader"
    :class="{ empty: !imageUrl }"
    @click="onClick"
  >
    <img
      v-if="imageUrl"
      :src="imageUrl"
    />
    <div class="image-loader_curtain">
      <img :src="IconAddImage" />
    </div>
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 336px;
  max-height: 260px;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
  }
  &_curtain {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $light-grey;
    opacity: 0.5;
  }
}
</style>
