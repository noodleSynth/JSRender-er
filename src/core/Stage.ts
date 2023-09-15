import { Actor, actorRegistry, Attribute, IActor, IAttribute } from "./Actor";
import { IStageManager, StageManager } from "./StageManager";

export interface IStage extends IActor {
  attributes: {
    aspectRatio: IAttribute<number>,
    timeScale: IAttribute<number>,
    currentTime: IAttribute<number>
  }
}

export const Stage = (): IStage => {
  return actorRegistry.registerActor(<IStage>{
    ...Actor("Stage"),
    attributes: {
      aspectRatio: Attribute<number>("Aspect Ratio", "aspectRatio", 0),
      timeScale: Attribute<number>("Time Scale", "timeScale", 0),
      currentTime: Attribute<number>("Current Time", "currentTime", 0, 'time')
    }
  })
}