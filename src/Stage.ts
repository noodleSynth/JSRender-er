import { Vec2 } from "./core/types/vec"

export default {
  clearColor: "#010101",
  get canvas() {
    return document.querySelector("#screen") as HTMLCanvasElement
  },

  get draw() {
    return this.canvas.getContext('2d')!
  },

  get size(): Vec2 {
    const { width, height } = this.canvas.getBoundingClientRect()
    return [width, height]
  },

  get aspectRatio(): number {
    const [top, bottom] = [Math.min, Math.max].map((e) => e(...this.size))
    return (Math.ceil((top / bottom) * 100) / 100) * (this.size[0] < this.size[1] ? 1 : -1)
  },

  set aspectRatio(newAR: number) {
    const { width, height } = (this.canvas as HTMLCanvasElement).parentElement!.getBoundingClientRect()
    const sign = Math.sign(newAR)
    const ar = Math.abs(newAR)
    const dir = Math.abs((sign + 1) / 2)



    this.size = [width, height].map((e, i) => i ? (dir * e) + (!dir * ar) * e : (!dir * e) + ((dir * ar) * e))

    console.log(sign, ar, dir)
    console.assert(this.aspectRatio === newAR)
  },

  set size([width, height]: Vec2) {
    this.canvas.setAttribute("width", width.toString())
    this.canvas.setAttribute("height", height.toString())
  }
}
