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

socket.on("update_control", ({ key, value, type }: ControlUpdateMessage) => {
  console.log(key, value)
  if (!controlRegistry[key]) controlRegistry[key] = { _value: value } as any as Control<any>
  else controlRegistry[key]._value = value
  if (changeListeners[key]) changeListeners[key].map(e => e({ key, value, type }))
})

socket.on("connect", () => {
  const registry = useControlRegistry()
  registry.dispatchChangeLister({ key: "connect", value: "", type: "lifecycle" })
  Object.entries(controlRegistry).forEach(([key, control]) => socket.timeout(5000).emit("update_control", { key, value: control.value, type: "lifecycle" }))
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
export const changeListeners = {} as {
  [key: string]: { (msg: ControlUpdateMessage): void }[]
}

export const useControlRegistry = () => ({
  registryList: () => {
    console.log(Object.entries(controlRegistry).map(([key, value]) => ({ key, value: value.value, type: typeof (value._value) })))
    // @ts-ignore
    return Object.entries(controlRegistry).map(([key, value]) => ({ key, value: value.value, type: typeof (value._value) }))
  },
  registryKeys: () => Object.keys(controlRegistry),
  registerChangeLister: (key: string, callback: { (msg: ControlUpdateMessage): void }) => {
    if (!changeListeners[key]) changeListeners[key] = [callback]
    if (changeListeners[key].includes(callback)) return
    changeListeners[key].push(callback)
  },
  dispatchChangeLister: (msg: ControlUpdateMessage) => {
    if (!changeListeners[msg.key]) return
    changeListeners[msg.key].forEach((e) => e(msg))
  },
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