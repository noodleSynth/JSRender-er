import './style.css'

let running = false

document.querySelector("#start")?.addEventListener("click", () => {
  running = true
  // Render start loop goes here
})

document.querySelector("#stop")?.addEventListener("click", () => {
  running = false
})