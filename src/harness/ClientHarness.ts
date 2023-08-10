import { control } from "../core/control/Control.type"
import { Vec2 } from "../core/types/vec"
import Stage from "../Stage"

// Client size harness
// Intended to strap the context to provide up to date
// info on the state of the client for accurate preview
//

export default () => {

  const handleResize = () => {
    const size = [window.innerWidth, window.innerHeight]
    Stage.size = size as Vec2

    // Harness handover to socket sync
    control('Aspect Ratio', Stage.aspectRatio).value = Stage.aspectRatio
  }

  window.addEventListener("resize", handleResize)
  handleResize()

}