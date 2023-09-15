<template>
  <div class="time-input">
    <input type="text" :value="timeString" maxlength="12"
      @keypress="e => { log(e); !isNaN(parseInt((<KeyboardEvent>e).key)) ? log(e) : e.preventDefault() }"
      @input.prevent="e => timeString = (<InputEvent>e).data" ref="input" />
  </div>
</template> 

<script lang="ts" setup>
import { computed, onErrorCaptured, ref, watch } from 'vue';


const props = (defineProps<{
  modelValue: number // in ms
}>())

const input = ref<HTMLInputElement>()

const log = console.log

const hour = computed({
  get: () => Math.floor(((props.modelValue / 1000) / 60) / 60),
  set: (nv: number) => console.log(nv * 60 * 60 * 1000)
})
const minute = computed({
  get: () => Math.floor(((props.modelValue / 1000) / 60) % 60),
  set: (nv: number) => console.log(nv * 60 * 1000)
})
const second = computed({
  get: () => Math.floor(((props.modelValue / 1000) % 60)),
  set: (nv: number) => {
    emit("update:modelValue", milliSeconds.value + minute.value + hour.value + (isNaN(nv) ? 0 : nv) * 1000)
  }
})
const milliSeconds = computed({
  get: () => Math.floor(((props.modelValue % 10))),
  set: (nv: number) => {
    console.log(milliSeconds.value)
    emit("update:modelValue", second.value + minute.value + hour.value + (isNaN(nv) ? 0 : nv) * 10)
  }
})

onErrorCaptured((e) => {
  console.error(e)
})

const emit = defineEmits(["update:modelValue"])

const timeString = computed({
  get() {
    var q = props.modelValue

    const h = Math.floor(((q / 1000) / 60 / 60) % 24)
    const m = Math.floor((((q / 1000) / 60) % 60))
    const s = Math.floor(q / 1000) % 60
    const ms = Math.floor((q % 1000) / 10)
    console.log(q, [h, m, s, ms])
    return `${h.toString().padStart(2, '0')}h${m.toString().padStart(2, '0')}m${s.toString().padStart(2, '0')}s${ms.toString().padStart(2, '0')}`
  },
  set(t) {
    if (!input.value || (t != null && isNaN(parseInt(t)))) return emit("update:modelValue", props.modelValue)
    const arr = [...input.value.value].filter(e => {
      return !(isNaN(parseInt(e)))
    })
    if (t == null)
      arr.unshift('0')
    if (t)
      arr.shift()
    const [_, h, m, s, ms] = new RegExp(/(\d{2})(\d{2})(\d{2})(\d{2})/g).exec(arr.join(''))!.map(e => parseInt(e))
    const newTime = (((h * 1000) * 60) * 60) + (((m * 1000) * 60)) + ((s * 1000)) + (ms * 10)

    emit("update:modelValue", newTime)
  }
})

</script>

<style lang="scss">
.time-input {
  display: flex;
  width: min-content;
  margin: auto;

  input {
    min-width: 32px;
    margin: 0px;
    padding: 0px;
    text-align: center;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type=number] {
      -moz-appearance: textfield;
    }
  }
}
</style>