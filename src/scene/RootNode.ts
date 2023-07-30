import { mutateRenderNode } from "../node/RenderNode.type"
import { spawnSeedNode } from "../node/SeedNode.type"
import { mapNode } from "../wolf"
import { SphereNode } from "./Sphere"
import { viewport } from "./ViewPort"

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


export const rootNode = mutateRenderNode(
  spawnSeedNode("Root", initRenderContext), (delta: number) => {

    if(!showMeta) return
    viewport.draw!.fillStyle = "#00FF00"
    viewport.draw!.fillText(`FPS ${(1 / delta).toFixed()}`, 50, 50)
    viewport.draw!.fillText(`${((Date.now() - startTime) / 1000).toFixed()} s`, 50, 70)
}, clearScreen )

console.log(rootNode)

// rootNode.children.push(SphereNode)
// rootNode.children.push(WallsNode)
rootNode.children.push(mapNode)
