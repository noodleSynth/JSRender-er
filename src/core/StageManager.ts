import { ControlProxy, IControlProxy } from "./Control";
import { Vec2 } from "./types/vec";

export interface IStageManager {
  running: boolean,
  rate: number,
  // size: Vec2,
  aspectRatio: IControlProxy<number>,
  sceneTime: number,
}

export const StageManager = ((): IStageManager => {
  var sceneTime = 0

  var rate = 0
  var running = false

  return {
    aspectRatio: ControlProxy<number>('aspectRatio', 0),
    set running(run: boolean) {
      running = run
      if (running && !rate) rate = 1
    },
    get running() { return running },

    get rate() {
      return rate
    },

    set rate(nr: number) {
      rate = nr
    },

    get sceneTime() {
      return sceneTime
    },

    set sceneTime(nt: number) {
      sceneTime = nt
    },
  }
})();