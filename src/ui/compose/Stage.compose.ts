import { ref, watch } from "vue"
import { IStage, Stage } from "../../core/Stage"

const stage = ref<IStage>(Stage())

export const useStage = () => {
  // watch(stage, () => {

  // }, { deep: true })

  // ...Object.fromEntries(Object.entries(stage.value.attributes).map(([key, v]) => [key, computed({
  //   get() {
  //     return v.value
  //   },
  //   set(T: any) {
  //     v.value = T
  //   }
  // })]))

  return {
    ...stage.value.attributes
  }
}