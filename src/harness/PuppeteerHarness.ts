import { createApp, defineComponent } from "vue"
import { changeListeners, control, controlRegistry, socket, useControlRegistry } from "../core/control/Control.type"
import { Vec2 } from "../core/types/vec"
import { createPinia } from 'pinia'
import Stage from "../Stage"

import App from '../ui/App.vue'

export default () => {
  useControlRegistry().registerChangeLister("Aspect Ratio", (msg) => {
    Stage.aspectRatio = msg.value
  })

  const pinia = createPinia()

  createApp(App)
    .use(pinia)
    .mount("#app")
}