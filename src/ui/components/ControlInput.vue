<template>
  <div class="control-input">
    <label v-if="label">{{ label }}</label>
    <div class="control-input__body">
      <slot v-bind="{ update: (key: string, value?: any) => $emit(`update:${key}`, value) }" />
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  label?: string
}>()

</script>

<style lang="sass">
.control-input
  &>label
    font-size: large
    color: white
    font-weight: bolder
</style>