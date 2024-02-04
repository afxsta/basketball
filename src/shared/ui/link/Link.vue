<script lang="ts" setup>
import {} from 'vue'

const props = defineProps({
  href: { type: String, default: '' },
  isDisabled: { type: Boolean, default: false },
})
</script>
<template>
  <RouterLink
    :class="{ disabled: isDisabled }"
    class="ui-link"
    :to="href"
  >
    <slot />
  </RouterLink>
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
