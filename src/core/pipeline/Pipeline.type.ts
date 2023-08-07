import { type Injector } from "./Injector.type"

type OutletSelection<T extends Injector> = (keyof Omit<T, "children" | "outlets">)[] | (keyof Omit<T, "children" | "outlets">)

export interface Pipeline {
  root: Injector,
  startTime: number,
  lastTime: number,
  runTime: number,
  run: { <T extends Injector>(outlets: OutletSelection<T>, ...args: any[]): void }
}

export const pipeLine = <T extends Injector>(start: T): Pipeline => {


  return {
    startTime: -1,
    lastTime: 0,
    root: start,

    get runTime() {
      return this.startTime ? Date.now() - this.startTime : -1
    },

    run<E extends Injector>(outlets: OutletSelection<E>, forward: boolean = true, ...args: any[]) {

      const execute = async (i: E) => {

        if (forward) await Promise.all(i.children.map(async (e) => await execute(e as E)))

        if (outlets instanceof Array)
          await Promise.all(outlets.map(async e => {
            if (!i[e]) return;
            await (i[e] as Function)(...args)
          }))
        else {
          if (!i[outlets]) return;
          await (i[outlets] as Function)(...args)
        }

        if (forward) await Promise.all(i.children.map(async (e) => await execute(e as E)))
      }

      this.startTime = Date.now()
      return execute(this.root as E).then(() => {
        this.lastTime = this.runTime
        this.startTime = -1
      })
    }
  }
}