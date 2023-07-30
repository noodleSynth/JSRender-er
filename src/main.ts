import { NodeType, NodeTypes } from './node/NodeType.enum'
import { RenderNode } from './node/RenderNode.type'
import { SeedNode } from './node/SeedNode.type'
import { traversePipeline } from './pipeline/Pipeline.type'
import { rootNode } from './scene/RootNode'
import './style.css'

var lastStep = Date.now()

const modes = {
  topDown: (...args: any[]) => (cn: NodeType, t: keyof NodeType, next: Function) => {
    if (cn[t] &&  typeof(cn[t]) === 'function')
      (cn[t] as Function)(...args);
    
    cn.children.forEach((c) => next(c))
  },
  bottomUp: (...args: any[]) => (cn: NodeType, t: keyof NodeType, next: Function) => {
    cn.children.forEach((c) => next(c))

    if (cn[t] &&  typeof(cn[t]) === 'function')
      (cn[t] as Function)(...args);
  }
}

const renderPipeline = () => {
  const delta = (Date.now() - lastStep) / 1000

  traversePipeline(rootNode, [NodeTypes.preRender], modes.topDown())

  traversePipeline(rootNode, [NodeTypes.render], modes.topDown(delta))
  
  lastStep = Date.now()
}


var running = false


const renderLoop = () => {
  if (!running) return


  renderPipeline()

  
  window.requestAnimationFrame(renderLoop)
}


traversePipeline(rootNode, [NodeTypes.seed], modes.topDown())

document.querySelector("#start")?.addEventListener("click", () => {
  running = true
  window.requestAnimationFrame(renderLoop)
})

document.querySelector("#stop")?.addEventListener("click", () => {
  running = false
})