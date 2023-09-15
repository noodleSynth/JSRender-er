<template>
  <div class="panel horizontal">
    <div class="panel horizontal">
      <Preview />
    </div>
    <div class="panel vertical">
      <ControlInput label="Aspect Ratio" @update:aspectRatio="e => aspectRatio.value = e">
        <template #default="{ update }">
          <div>
            <label style="align-items: center; display: flex">
              <span style="aspect-ratio: 1;">0</span>
              <input type="range" min="-1" max="1" step="0.01" :value="aspectRatio.value"
                @input="(e) => update('aspectRatio', parseFloat((<HTMLInputElement>e.target).value))" />
              <span style="aspect-ratio: 1;">1</span>
              <label>: {{ (((aspectRatio.value + 1) / 2) * 100).toFixed(0).padStart(3, '0') }}</label>
            </label>
          </div>
        </template>
      </ControlInput>
      <KeepAlive>
        {{ formattedTime }}
      </KeepAlive>
      <TimeControls />
    </div>
    <ActorList />
  </div>
  <div class="panel horizontal">
    <KeyframeTimeline class="col-10" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ActorList from './components/ActorList.vue';
import ControlInput from './components/ControlInput.vue';
import KeyframeTimeline from './components/KeyframeTimeline.vue';
import Preview from './components/Preview.vue';
import TimeControls from './components/TimeControls.vue';
import { useStage } from './compose/Stage.compose';


// const stageStore = useStageStore()
const { aspectRatio, currentTime, timeScale } = useStage()

const startTime = ref(Date.now())

const formattedTime = computed(() => {
  var inSeconds = (currentTime.value / 1000)
  const minutes = Math.floor(inSeconds / 60)
  inSeconds -= Math.floor(minutes * 60)
  return `${minutes.toString().padStart(2, '0')} : ${inSeconds.toFixed(2).padStart(5, '0')} s`
})

const updateTime = () => {
  currentTime.value = parseFloat((currentTime.value + (Date.now() - startTime.value) * timeScale.value).toFixed(2))
  if (currentTime.value < 0) currentTime.value = 0


  startTime.value = Date.now()
  window.requestAnimationFrame(updateTime)
}
window.requestAnimationFrame(updateTime)


</script>

<style lang="sass">
#app
  justify-content: stretch
  align-items: stretch
  height: 100vh // calc(100vh - 20px)
  display: grid
  grid-template-rows: 1fr 1fr
  max-width: 100vw
  width: 100vw
.panel
  background: rgba(255, 255, 255, 0.1)
  border: 1px white solid
  display: flex
  color: white
  object-fit: fill
  padding: .5rem
  align-items: stretch
  justify-content: stretch
  &.center
    justify-content: center
    align-items: center
  &.vertical
    flex-direction: column
    
  &.full
    width: 100%
@for $i from 2 through 10
  .panel.col-#{$i}
    flex: 1/#{$i}

</style>