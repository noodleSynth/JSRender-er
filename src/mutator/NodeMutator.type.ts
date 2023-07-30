import { SeedNode } from "../node/SeedNode.type";

export type NodeMutator<T extends SeedNode, argT extends (Function | undefined)[]> = {(seed: SeedNode, ...args: argT) : T}