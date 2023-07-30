

const displayCanvas: HTMLCanvasElement = document.querySelector('canvas')!

window.addEventListener('resize', () => viewport.size = [window.innerWidth, window.innerHeight])

export const viewport = {
  get size() : number[] {
    const { width, height } = displayCanvas!.getBoundingClientRect()
    return [width, height]
  },
  set size([width, height] : number[]) {
    displayCanvas.setAttribute("width", width.toString())
    displayCanvas.setAttribute("height", height.toString())
  },
  get draw(): CanvasRenderingContext2D {
    return displayCanvas.getContext('2d')!
  }
}

viewport.size = [window.innerWidth, window.innerHeight]