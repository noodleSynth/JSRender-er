import { Vec2 } from "../core/types/vec"
import { viewContext } from "../scene1/Canvas"

const canvas = document.createElement('canvas') as HTMLCanvasElement

const previewContainer = document.createElement('div')

previewContainer.classList.add('pane', 'preview')

canvas.setAttribute('id', '#screen')
previewContainer.appendChild(canvas)

viewContext.canvas = canvas;

export const handleResize = () => {
  const { width, height } = previewContainer.getBoundingClientRect()
  viewContext.size = [width, height].map((e) => e * 0.9) as Vec2
}

window.onresize = handleResize

export default previewContainer