import { createApp, defineComponent } from "vue"
import { changeListeners, control, controlRegistry, socket } from "../core/control/Control.type"
import { Vec2 } from "../core/types/vec"
import Stage from "../Stage"
import App from '../ui/App.vue'

export default () => {
  if (!changeListeners["Aspect Ratio"]) changeListeners["Aspect Ratio"] = []
  changeListeners["Aspect Ratio"].push((msg) => {
    console.log(msg)
    Stage.aspectRatio = msg.value
  })

  createApp(App).mount("#app")
}