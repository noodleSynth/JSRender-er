import { Injector, injector } from "../core/pipeline/Injector.type";
import { LifeCycleInjector } from "../scene1/Render";
import controlsContainer, { buildControls } from "./Controls";
import previewContainer, { handleResize } from "./Preview";

interface UIInjector extends LifeCycleInjector {

}

const pageRoot = document.createElement('div')
const topPane = document.createElement('div')
const bottomPane = document.createElement('div')

export const uiInjector = injector<UIInjector>({
  async preInit() {
    console.log("ui pre Init")
    document.body.innerHTML = ""
    document.body.append(pageRoot)

    topPane.appendChild(previewContainer)
    topPane.appendChild(controlsContainer)

    pageRoot.appendChild(topPane)
    pageRoot.appendChild(bottomPane)
  },

  init() {
    console.log("ui Init")
    pageRoot.classList.add("pane", "root", "vertical")

    topPane.classList.add("pane", "top", "horizontal")
    bottomPane.classList.add("pane", "bottom", "horizontal")

    // console.log(useControlRegistry().registryList())
  },
  postInit() {
    handleResize()
    buildControls()
  },
})