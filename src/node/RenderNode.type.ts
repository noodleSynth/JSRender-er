import { NodeMutator } from "../mutator/NodeMutator.type"
import { NodeTypes } from "./Injector.type"
import { SeedNode } from "./SeedNode.type"

export interface RenderNode extends SeedNode{
  render: {
    (delta: number) : void
  },
  prePass?: {
    ():void
  }
}

export type RenderFunction = { (delta: number): void }
export type PrePassFunction = {() : void}

export const mutateRenderNode: NodeMutator<RenderNode, [RenderFunction, PrePassFunction | undefined]> = (seed, render: RenderFunction, preRender?: PrePassFunction) => {
  if (seed.tags.includes(NodeTypes.render)) {
     throw `Node: '${seed.name}' already has the mutation: ${NodeTypes[NodeTypes.render]} `
  }

  return {
    ...seed,
    tags: [...seed.tags, NodeTypes.render, ...preRender ? [NodeTypes.preRender] : []],
    preRender,
    render
  }
}
