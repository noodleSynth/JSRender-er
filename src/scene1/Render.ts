import { type Injector, injector } from "../core/pipeline/Injector.type";
import { pipeLine } from "../core/pipeline/Pipeline.type";
import { canvasInjector, type CanvasInjector } from "./Canvas";

type Vec2 = [number, number]

export interface RenderInjector extends Injector {
  running: boolean,
  lastFrame: number
  start(): void,
  stop(): void,
  reset(): void
}



export const Render: RenderInjector = injector({
  running: false,
  lastFrame: 0,
  // Start the render loop
  start() {
    renderPipeline.run<CanvasInjector>(["init", "render"])

    // The render loop
    const render = async () => {
      const timeDelta = Date.now() - this.lastFrame
      await renderPipeline.run<CanvasInjector>("render", true, timeDelta)

      // Rerun
      this.lastFrame = Date.now()
      if (this.running)
        window.requestAnimationFrame(render)
    }

    // Safety and fire
    this.running = true
    window.requestAnimationFrame(render)
  },

  stop() {
    // Arm safety
    this.running = false
  },
  reset() {

  }
})

Render.children.push(canvasInjector)

export const renderPipeline = pipeLine(Render)