
export type AdjustableType = number | string | number[]

export interface Adjustable<T> {
  value: T
}

export interface AdjustableRegistry {
  [key: string]: Adjustable<AdjustableType>
}

export const adjustableRegistry: AdjustableRegistry = {}

export const adjustable = <T extends AdjustableType>(key: string, initValue: T): Adjustable<T> => {

  if (adjustableRegistry[key]) return adjustableRegistry[key]! as Adjustable<T>

  const instance = {
    _value: initValue,
    get value() {
      // @ts-ignore
      return this._value
    },

    set value(nv: T) {
      // @ts-ignore
      this._value = nv
      window.dispatchEvent(new AdjustmentUpdate(key))
    }
  } as Adjustable<T>

  window.dispatchEvent(new AdjustmentChange())
  adjustableRegistry[key] = instance

  return instance
}