import { io } from 'socket.io-client'
export type ControlType = number | string | number[]

export const socket = io("http://localhost:3000", {
  reconnection: true,
  reconnectionDelay: 200,

})

interface ControlUpdateMessage {
  key: string,
  value: any,
  type: ControlType
}

socket.on("update_control", ({ key, value }: ControlUpdateMessage) => {
  console.log(key, value)
  controlRegistry[key]._value = value
})

socket.on("connect", () => {
  console.log("Connected")
  socket.timeout(200).emit("testing")
})

export interface Control<T> {
  value: T
}

export interface ControlRegistry {
  [key: string]: Control<ControlType>
}

export const controlRegistry: ControlRegistry = {}

export const useControlRegistry = () => ({
  registryList: () => {
    console.log(Object.entries(controlRegistry).map(([key, value]) => ({ key, value: value.value, type: typeof (value._value) })))
    // @ts-ignore
    return Object.entries(controlRegistry).map(([key, value]) => ({ key, value: value.value, type: typeof (value._value) }))
  },
  registryKeys: () => Object.keys(controlRegistry),
  controlRegistry
})

export const control = <T extends ControlType>(key: string, initValue: T): Control<T> => {

  const registry = useControlRegistry()

  if (registry.controlRegistry[key]) return registry.controlRegistry[key]! as Control<T>

  const instance = {
    _value: initValue,
    get value() {
      // @ts-ignore
      return this._value
    },

    set value(nv: T) {
      // @ts-ignore
      this._value = nv
      console.log(socket.id, socket.connected)
      socket.timeout(5000).emit("update_control", { key, value: nv })//.then(() => console.log("Sent"))
    }
  } as Control<T>

  registry.controlRegistry[key] = instance

  return instance
}