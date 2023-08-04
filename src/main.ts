import { Render } from './scene1/Render'
import './style.css'

// Adding controls for the render
document.querySelector("#start")?.addEventListener("click", () => {
  Render.start()
  // Render start loop goes here
})

document.querySelector("#stop")?.addEventListener("click", () => {
  Render.stop()
})

Render.start()