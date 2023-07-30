import { RenderNode } from "./RenderNode.type";
import { SeedNode } from "./SeedNode.type";

export enum NodeTypes{
  seed, render, preRender
}

export type NodeType = SeedNode | RenderNode