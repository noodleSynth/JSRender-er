<template>
  <div class="keyframe-timeline">
    <div class="panel__toolbar">
      <input type="range" min="1" max="5" step="0.01" :value="timeScale"
        @input="e => timeScale = parseFloat((<HTMLInputElement>e.target).value)" />{{ intervalCount }}
    </div>
    <div class="keyframe-timeline__timeline" draggable="true" @click="seek" @dragstart="dragStart" @drag="dragScroll"
      @dragend="isDragging = false" ref="timelineContainer">

      <div class="timeline-index" v-for="i in intervalCount + 1" :index="i - 1" />

      <div class="timeline-cursor" :style="{ left: `${cursorPosition - (elementWidth / 2)}px` }" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useStage } from '../compose/Stage.compose';

const timeScale = ref(1.0)
const maxIntervals = 150;
const minIntervals = 12;
const elementWidth = ref(10)
const timelineContainer = ref<HTMLElement>()
const intervalCount = ref(maxIntervals)
const isDragging = ref(false)

const { currentTime } = useStage()

const dragStart = (e: Event) => {
  const event = <DragEvent>e
  var img = new Image();
  img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
  event.dataTransfer!.setDragImage(img, 0, 0);
  isDragging.value = true
}

const dragScroll = (e: Event) => {
  const event = <DragEvent>e
  if (event.clientX <= 0) return
  seek(e)
  e.stopPropagation()
}

const cursorPosition = computed(() => {
  if (!timelineContainer.value) return 0
  return ((currentTime.value * elementWidth.value) / 1000) + elementWidth.value / 2
})

watch(timeScale, () => {
  if (!timelineContainer.value) return 0
  const { width } = timelineContainer.value.getBoundingClientRect()
  intervalCount.value = Math.max(Math.min(Math.ceil((width) / (timeScale.value * 10)), maxIntervals), minIntervals)
  elementWidth.value = timelineContainer.value.children[0].getBoundingClientRect().width
})


const seek = (e: Event) => {
  console.log(e)
  if (!timelineContainer.value) return
  const event = <MouseEvent>e;
  const { left } = timelineContainer.value.getBoundingClientRect()
  // console.log(left)
  const val = (event.clientX - left) / elementWidth.value
  if (val < 0) return
  currentTime.value = (Math.max(0, val) * 1000)
}

</script>

<style lang="sass">
.keyframe-timeline
  height: auto
  object-fit: fill
  display: grid
  grid-template-rows: 1fr 10fr
  justify-content: stretch
  align-items: stretch
  width: 100%
  padding: 0px
  position: relative
  .keyframe-timeline__timeline
    margin: 10px
    display: flex
    justify-content: start
    align-items: stretch
    padding: 0px
    margin: 0px
    height: 100%
    width: 100%
    position: relative
  .timeline-index
    height: 100%
    padding: 0
    box-shadow: inset 0px 0px 2px 0px black
    margin-top: 20px
    flex: 1
    background: rgba(255, 255, 255, 0.2)
    &:nth-child(5n + 1)
      background: rgba(255, 255, 255, 0.5)
      &::before
        content: attr(index)
        margin: auto
        top: 0px
        margin: auto
        position: absolute
        transform: rotate(-90deg)
  .timeline-cursor
    border-left: solid 2px red
    position: absolute
    left: 0px
    top: 0px
    height: 100%
    


</style>