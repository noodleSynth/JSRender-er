<template>
  <div class="panel" id="preview">
    <div id="backplate" class="panel center" ref="container">
      <canvas v-bind="size" id="screen"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Stage from '../Stage';

const aspectRatio = computed(() => Stage.aspectRatio)

const container = ref<HTMLElement>()

const size = computed(() => {
  if (!container.value) return {}
  const { height } = container.value.getBoundingClientRect()
  return {
    width: height * aspectRatio.value,
    height
  }
})

</script>

<style lang="sass">
#preview
  max-height: 40vh
  width: 40vh
  position: relative
  aspect-ratio: 1/1
#backplate
  aspect-ratio: 1/1
  height: 100%
  width: 100%
  padding: 0px
  background-color: black
  canvas
    max-height: calc(100% - 2em)
    max-width: calc(100% - 2em)
    display: block
    margin: auto
    border: 1px solid blue
</style>