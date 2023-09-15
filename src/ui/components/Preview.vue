<template>
  <div class="panel" id="preview">
    <div id="backplate" class="panel center" ref="container">
      <canvas v-bind="size" ref="canvas" id="screen"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStage } from '../compose/Stage.compose';

// import { useStageStore } from '../store/StageStore';


const container = ref<HTMLElement>()
const canvas = ref<HTMLCanvasElement>()
// const stageStore = useStageStore()
const { aspectRatio } = useStage()

const size = computed(() => {
  if (!container.value) return {}
  const { width, height } = container.value!.getBoundingClientRect()
  const obj = { width, height }
  const { sin, cos, PI } = Math
  const ar = ((aspectRatio.value + 1) / 2) * (PI / 2)

  return Object.fromEntries(Object.entries(obj).map(([key, e], i) => [key, (i ? sin(ar) : cos(ar)) * e]))
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
  min-width: 100px
  min-height: 100px
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