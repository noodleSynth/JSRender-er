<template>
  <div class="attribute_input">
    <label class="attribute_input__label">{{ uAttr.attributeName }}</label>

    <component v-if="uAttr.inputType && attributeInputs[uAttr.inputType!]" :is="attributeInputs[uAttr.inputType]"
      :modelValue="(uAttr.value)" @update:modelValue="e => uAttr.value = e" />

    <label v-else class="attribute_input__value">{{ attribute.value }}</label>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, Ref, unref } from 'vue';
import { IAttribute } from '../../core/Actor';
import attributeInputs from './attributeInputs'

const props = defineProps<{
  attribute: IAttribute | Ref<IAttribute>
}>()

const uAttr = computed(() => unref(props.attribute))

</script>

<style lang="scss">
.attribute_input {
  display: grid;
  grid-template-columns: 1fr minmax(100px, min-content);
  font-size: small;

  &__value {
    text-align: right;
  }

  &__label {
    font-weight: bolder;
  }
}
</style>