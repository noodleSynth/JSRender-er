import { Injector, injector } from "../pipeline/Injector.type";
import { pipeLine } from "../pipeline/Pipeline.type";
import { cloudInjector } from "./Cloud";
import { Sphere } from "./Sphere";

type Vec2 = [number, number]

export const viewContext = {
  clearColor: "#010101",
  canvas: document.querySelector("#screen") as HTMLCanvasElement,
  get draw() {
    return this.canvas.getContext('2d')!
  },

  get size(): Vec2 {
    const { width, height } = this.canvas.getBoundingClientRect()
    return [width, height]
  },

  set size([width, height]: Vec2) {
    this.canvas.setAttribute("width", width.toString())
    this.canvas.setAttribute("height", height.toString())
  }
}

const onScreenResize = (e: Event) => {
  console.log(e)
}

export interface CanvasInjector extends Injector {
  init(): void,
  render(delta: number): void
}


export const canvasInjector: CanvasInjector = injector({
  async init() {
    if (!viewContext.canvas) throw "Could not attach to canvas"
    if (!viewContext.draw) throw "Could not get draw context for the canvas"

    window.addEventListener('resize', onScreenResize)
    viewContext.size = [window.innerWidth, window.innerHeight]
  },

  render(delta: number) {
    viewContext.draw.fillStyle = viewContext.clearColor
    viewContext.draw.fillRect(0, 0, ...viewContext.size)
    viewContext.draw.strokeStyle = "#FF0000"
    viewContext.draw.fillStyle = "#FF0000"
    viewContext.draw.fillText(`FPS: ${(1000 / delta).toFixed(2).toString()}`, 100, 100)
  },

})

canvasInjector.children.push(Sphere)
canvasInjector.children.push(cloudInjector)
