<script lang="ts" setup>
import {} from 'vue'

const props = defineProps({
  href: { type: String, default: '' },
  isDisabled: { type: Boolean, default: false },
})
</script>
<template>
  <a
    class="ui-link"
    :href="href"
    :class="{ disabled: isDisabled }"
  >
    <slot />
  </a>
</template>
<style lang="scss" scoped>
.ui-link {
  font-size: 14px;
  line-height: 20px;
  color: var(--red);
  transition: var(--transition-1);
  font-weight: 500;
  &.disabled {
    color: var(--lightest-grey);
  }
}
</style>
