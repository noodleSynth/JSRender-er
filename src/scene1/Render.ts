import { Injector, injector } from "../core/pipeline/Injector.type";
import { pipeLine } from "../core/pipeline/Pipeline.type";
import { canvasInjector, CanvasInjector } from "./Canvas";

type Vec2 = [number, number]

export interface RenderInjector extends Injector {
  initialize(): Promise<void>;
  running: boolean,
  lastFrame: number
  start(): void,
  stop(): void,
  reset(): void,
}

export interface LifeCycleInjector extends Injector {
  preInit?: { (): void },
  init?: { (): void },
  postInit?: { (): void },
}


export const Render: RenderInjector = injector({
  running: false,
  lastFrame: 0,
  async initialize() {
    await renderPipeline.run<LifeCycleInjector>(["preInit"])
    await renderPipeline.run<LifeCycleInjector>(["init"])
    await renderPipeline.run<LifeCycleInjector>(["postInit"])
  },
  // Start the render loop
  async start() {
    // The render loop
    const render = async () => {
      const timeDelta = Date.now() - this.lastFrame
      await renderPipeline.run<CanvasInjector>("render", false, timeDelta)

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