import { NodeType, NodeTypes } from "../node/Injector.type";

export type PipelineMode = { (currentNode: NodeType, targetType: keyof NodeType, next: { (nextNode?: NodeType): void }): NodeType | void }

export const traversePipeline = (rootNode: NodeType, targets: NodeTypes[] , traverse: PipelineMode) => {

  const next = (nextNode?: NodeType) => {
    if (!nextNode) return
    targets.forEach((t) => traverse(nextNode, NodeTypes[t] as keyof NodeType, next))
  }

  next(rootNode)
}