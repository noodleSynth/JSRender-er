<template>
  <ControlInput class="time-controls" label="Time Controls" v-on="handlers">
    <template #default="{ update }">
      <div>
        <label style="align-items: center; display: flex;">
          <button @click="update('play')">▶️</button>
          <button @click="update('pause')">⏸️</button>
          <div style="align-items: center; display: flex; flex-direction: column;">
            <span style="aspect-ratio: 1;">2</span>
            <input type="range" :value="timeScale.value"
              @input="(e) => update('playbackRate', parseFloat((<HTMLInputElement>e.target).value))" orient="vertical"
              min="-2" max="2" step="0.1" />
            <span style="aspect-ratio: 1;">-2</span>
          </div>
          <label>: x{{ (((timeScale.value) / 2) * 100).toFixed(0).padStart(3, '0') }}</label>
        </label>
      </div>

    </template>
  </ControlInput>
  <div>

  </div>
</template>

<script lang="ts" setup>
import { useStage } from '../compose/Stage.compose';
import ControlInput from './ControlInput.vue';

const { timeScale } = useStage()

const handlers = {
  'update:play': () => timeScale.value = (1),
  'update:pause': () => timeScale.value = (0),
  'update:playbackRate': (e: number) => timeScale.value = (e)
}
</script>

<style lang="sass">
input[type=range][orient=vertical]
  writing-mode: bt-lr
  -webkit-appearance: slider-vertical
  width: 8px
  height: 100px
  padding: 0 5px

</style>