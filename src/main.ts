import { Injector, NodeType, NodeTypes } from './node/Injector.type'
import { RenderNode } from './node/RenderNode.type'
import { SeedNode } from './node/SeedNode.type'
import ROOT_INJECTOR from './pipeline/mainPipeline/index'
import { traversePipeline } from './pipeline/Pipeline.type'
import { rootNode } from './scene/RootNode'
import './style.css'

var lastStep = Date.now()

const traverse = <T extends Injector>(start: T, outlets: (keyof Omit<T, "children" | "outlets">)[], forward: boolean = true, ...args: any[]) => {
  const execute = (i: T) => {

    if (!forward) i.children.forEach((e) => execute(e as T))

    outlets.forEach(e => {
      if (!i[e]) return;
      (i[e] as Function)(...args)
    })

    if (forward) i.children.forEach((e) => execute(e as T))
  }

  execute(start)
}

const renderPipeline = () => {
  const delta = (Date.now() - lastStep) / 1000

  traverse(ROOT_INJECTOR, ["beforeRender"])
  traverse(ROOT_INJECTOR, ["render"], true, delta)
  traverse(ROOT_INJECTOR, ["update"], true, delta)

  // traversePipeline(rootNode, [NodeTypes.preRender], modes.topDown())

  // traversePipeline(rootNode, [NodeTypes.render], modes.topDown(delta))

  lastStep = Date.now()
}


var running = false


const renderLoop = () => {
  if (!running) return


  renderPipeline()


  window.requestAnimationFrame(renderLoop)
}


traverse(ROOT_INJECTOR, ["seed"])

document.querySelector("#start")?.addEventListener("click", () => {
  running = true
  window.requestAnimationFrame(renderLoop)
})

document.querySelector("#stop")?.addEventListener("click", () => {
  running = false
})