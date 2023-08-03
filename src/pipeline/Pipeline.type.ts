import { Injector } from "./Injector.type";

type OutletSelection<T extends Injector> = (keyof Omit<T, "children" | "outlets">)[] | (keyof Omit<T, "children" | "outlets">)

export interface Pipeline {
  root: Injector,
  startTime: number,
  runTime: number,
  run: { <T extends Injector>(outlets: OutletSelection<T>): void }
}

export const pipeLine = <T extends Injector>(start: T, forward: boolean = true, ...args: any[]): Pipeline => {

  var startTime = 0

  return {
    startTime,
    root: start,

    get runTime() {
      return this.startTime ? Date.now() - this.startTime : -1
    },

    run<E extends Injector>(outlets: OutletSelection<E>) {
      this.startTime = Date.now()

      const execute = (i: E) => {

        if (!forward) i.children.forEach((e) => execute(e as E))

        if (outlets instanceof Array)
          outlets.forEach(e => {
            if (!i[e]) return;
            (i[e] as Function)(...args)
          })
        else {
          if (!i[outlets]) return;
          (i[outlets] as Function)(...args)
        }

        if (forward) i.children.forEach((e) => execute(e as E))
      }

      execute(this.root as E)
    }
  }
}