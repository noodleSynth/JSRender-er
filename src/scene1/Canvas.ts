import { socket } from "../core/control/Control.type";
import { Injector, injector } from "../core/pipeline/Injector.type";
import { pipeLine } from "../core/pipeline/Pipeline.type";
import { cloudInjector } from "./Cloud";
import { LifeCycleInjector } from "./Render";
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

  get aspectRatio(): Vec2 {
    return [this.size[1] / this.size[0], this.size[1] / this.size[0]]
  },

  set size([width, height]: Vec2) {
    this.canvas.setAttribute("width", width.toString())
    this.canvas.setAttribute("height", height.toString())
  }
}


export interface CanvasInjector extends LifeCycleInjector {
  init(): void,
  render(delta: number): void
}


export const canvasInjector: CanvasInjector = injector({

  async init() {
    console.log("Canvas init...")
    viewContext.canvas = document.querySelector("canvas") as HTMLCanvasElement

    if (!viewContext.canvas) throw "Could not attach to canvas"
    if (!viewContext.draw) throw "Could not get draw context for the canvas"
    console.log("Canvas init ok")
    socket.connect()
    // viewContext.size = [window.innerWidth, window.innerHeight]
  },

  render(delta: number) {
    viewContext.draw.fillStyle = viewContext.clearColor
    viewContext.draw.fillRect(0, 0, ...viewContext.size)
    viewContext.draw.strokeStyle = "#FF0000"
    viewContext.draw.fillStyle = "#FF0000"
    viewContext.draw.fillText(`FPS: ${(1000 / delta).toFixed(2).toString()}`, ...[100, 100].map((e, i) => viewContext.aspectRatio[i] * e))
  },

})

canvasInjector.children.push(Sphere)
canvasInjector.children.push(cloudInjector)
