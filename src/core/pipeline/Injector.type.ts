
export interface Injector {
  children: Injector[],
  outlets: string[],
}

type OutletConfig<T extends Injector> = {
  [key in keyof Omit<T, "children" | "outlets">]: T[key]
}

export const injector = <T extends Injector>(outletSpec: OutletConfig<T>): T => {
  const self = {

    children: [] as Injector[],
    outlets: Object.entries(outletSpec).filter(([_, cb]: [string, any]) => typeof (cb) === 'function').map(([key]) => key),
  } as T

  Object
    .assign(self, Object
      .fromEntries(Object
        .entries(outletSpec)
        .filter(([_, cb]: [string, any]) => typeof (cb) === 'function')
        .map(([key, cb]: [string, any]) => [key, cb.bind(self)])))

  return self;
}
