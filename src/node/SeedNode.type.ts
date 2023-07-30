import { NodeTypes } from "./NodeType.enum"


export interface SeedNode{
  tags: NodeTypes[],
  children: SeedNode[],
  name: string,
  seed?: {
    (): void
  }
}

export const spawnSeedNode = (name: string, seed?: {(): void}): SeedNode => ({
  tags: [NodeTypes.seed],
  children: [],
  name,
  seed
})
