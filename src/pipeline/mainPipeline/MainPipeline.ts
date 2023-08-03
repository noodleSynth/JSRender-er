import { injector, Injector } from "../../node/Injector.type"
import { viewport } from "../../game/ViewPort"



export interface RootInjector extends Injector {
  seed: { (): void },
  render: { (delta: number): void },
  beforeRender: { (): void }
}


const showMeta = true
var startTime = 0

const initRenderContext = () => {
  startTime = Date.now()
  clearScreen()
}
const clearScreen = () => {
  const [width, height] = viewport.size

  viewport.draw!.fillStyle = "#000000"
  viewport.draw!.fillRect(0, 0, width, height)
}


export const rootInjector = (): RootInjector => {

  return injector<RootInjector>({
    beforeRender() {
      clearScreen()
    },
    render(delta: number) {

      if (!showMeta) return
      viewport.draw!.fillStyle = "#00FF00"
      viewport.draw!.fillText(`FPS ${(1 / delta).toFixed()}`, 50, 50)
      viewport.draw!.fillText(`${((Date.now() - startTime) / 1000).toFixed()} s`, 50, 70)


    },
    seed() {
      initRenderContext()
      console.log("Root Seed")
    }
  })
}

