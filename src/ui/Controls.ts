import { controlRegistry, useControlRegistry } from "../core/control/Control.type"
import { Render } from "../scene1/Render";

const registry = useControlRegistry();

const controlsContainer = document.createElement('div')

controlsContainer.classList.add("pane", "vertical")


export const buildControls = () => {
  registry.registryList().map(({ key, value, type }) => {
    // console.log(key)
    const inputContainer = document.createElement('div')
    const inputLabel = document.createElement('label')
    const inputControl = document.createElement('input') as HTMLInputElement

    inputContainer.classList.add('pane', 'input', type)
    inputContainer.appendChild(inputLabel)
    inputContainer.appendChild(inputControl)

    inputLabel.innerText = key

    inputControl.type = 'range'
    inputControl.value = value.toString()
    inputContainer.addEventListener('input', (e) => {
      const el = e.target as HTMLInputElement
      controlRegistry[key].value = el.value
    })


    return inputContainer
  }).forEach(e => controlsContainer.appendChild(e))
}



export default controlsContainer