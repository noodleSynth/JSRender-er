export interface IControlProxy<T> {
  value: T,
  alias: string,
  __isControlProxy: true
}

export interface IControlGroup {

}

export const ControlProxy = <T>(alias: string, defaultValue?: T): IControlProxy<T> => {

  var _value: T | undefined = defaultValue

  return {
    get value() {
      return <T>_value
    },
    set value(nv: T) {
      _value = nv
    },
    alias,
    __isControlProxy: true
  }
}

