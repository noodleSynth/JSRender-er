import { RootInjector } from "../pipeline/mainPipeline/MainPipeline";
import { RenderNode } from "./RenderNode.type";
import { SeedNode } from "./SeedNode.type";

export enum NodeTypes {
  seed, render, preRender
}

export type NodeType = SeedNode | RenderNode

export interface Injector {
  children: Injector[],
  outlets: string[],
}

type OutletConfig<T extends Injector> = {
  [key in keyof Omit<T, "children" | "outlets">]: Function
}

export const injector = <T extends Injector>(outletSpec: OutletConfig<T>): T => {
  const self = {
    children: [] as Injector[],
    outlets: Object.keys(outletSpec),
  } as T

  Object.assign(self, Object.fromEntries(Object.entries(outletSpec).map(([key, cb]: [string, any]) => [key, cb.bind(self)])))

  return self;
}
