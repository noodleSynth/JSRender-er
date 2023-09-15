import { ControlProxy, IControlProxy } from "./Control"

export interface IAttribute<T = any> extends IControlProxy<T> {
  attributeKey: string,
  attributeName: string,
  value: T,
  canKey: boolean,
  inputType?: string,
  __isAttribute: true
}

export interface IActor {
  displayName: string,
  uid: string,
  attributes: {
    [attrName: string]: IAttribute
  }
}

export const actorRegistry = (() => {
  const actors: {
    [key: string]: IActor
  } = {}
  return {
    registerActor<T extends IActor>(actor: T) {
      actors[actor.uid] = actor
      return actor
    },
    actors
  }
})()

export const Attribute = <T = any>(attributeName: string, attributeKey: string, defaultValue?: T, inputType?: string, canKey = false): IAttribute<T> => {
  return {
    attributeKey,
    attributeName,
    canKey,
    inputType,
    ...ControlProxy<T>(attributeKey, defaultValue),
    __isAttribute: true
  }
}

export const Actor = (displayName: string): IActor => {

  return {
    uid: crypto.randomUUID.toString(),
    displayName,
    attributes: {}
  }
}