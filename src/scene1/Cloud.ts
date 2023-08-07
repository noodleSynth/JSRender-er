import { type Injector, injector } from "../core/pipeline/Injector.type";
import { pipeLine } from "../core/pipeline/Pipeline.type";
import { viewContext } from "./Canvas";
import { renderPipeline } from "./Render";
import { Sphere } from "./Sphere";

type Vec2 = [number, number]

export interface CloudInjector extends Injector {
  init(): void,
  render(delta: number): void,
  timeElapsed: number
}

var modifiers: number[] = []

export const cloudInjector: CloudInjector = injector({
  timeElapsed: 0,
  init() {
    this.timeElapsed = 0
  },
  render(delta: number) {

    if (isNaN(this.timeElapsed)) this.timeElapsed = 0

    const draw = viewContext.draw
    this.timeElapsed = (this.timeElapsed + (delta / 1000))
    if (this.timeElapsed > 10) this.timeElapsed = 0
    const { sin, cos, PI, min, floor, pow } = Math

    const apsect = viewContext.size[0] / viewContext.size[1]
    const screenSize = viewContext.size
    const screenCenter = screenSize.map((e) => e / 2)

    const progress = (((this.timeElapsed) / 10))
    viewContext.draw.fillStyle = "#FF0000"
    viewContext.draw.fillText(`Duration: ${(Math.floor(Math.abs((progress - 0.5)) * 255)).toString(16)}`, 100, 140)


    /* 
    |< x- -----0----- x+ >|
      _
      ^
      y-
      |
      |
      0
      |
      |
      y+
      
      v
      -
  
    */
    // viewContext.draw.fillStyle = "#FF0000"
    // viewContext.draw.fillText(`Duration: ${(this.timeElapsed / 1000).toFixed(2)}`, 100, 140)
    // viewContext.draw.fillText(`Phase: ${pointScalar.map(e => e.toFixed(2))}`, 100, 120)

    if (modifiers.length < 100)
      modifiers.push(Math.random())
    // if (modifiers.length > 999)
    //   modifiers.splice(1, 1)

    for (var d = 0; d < modifiers.length; d++) {
      const ballProgress = progress + (modifiers[d] * (d / 100))
      const ballRads = (ballProgress * 360) * (PI / 180)

      const size = [15, 15].map((e, i) => e + ((0.5 + sin(ballRads)) * e))//.map((e, i) => e + (min((sin(ballProgress)) + (0.5), 1) * e)) as Vec2
      // Closest to the viewport
      const pointScalar = [cos, sin].map((e, i) => ((e(ballRads) * modifiers[d] * [1, 0][i]) + (e(ballRads) * 0.5)))
      const foreground = pointScalar.map((e, i) => (screenCenter[i]) + (e * min(...screenCenter))) as Vec2

      // viewContext.draw.fillStyle = "#FF0000"
      // viewContext.draw.fillText(`Duration: ${(this.timeElapsed / 1000).toFixed(2)}`, 100, 140)
      // viewContext.draw.fillText(`${d} Mod: ${pointScalar.map(e => e.toFixed(2))}`, 100, 120)

      // #06
      // #6
      draw.fillStyle = `#${(Math.floor(Math.abs(((1 - cos(ballRads)) / 2) * modifiers[d]) * 255)).toString(16).padStart(2, '0')}${(Math.floor(Math.abs(cos(ballRads) * sin(ballRads) * modifiers[d]) * 255)).toString(16).padStart(2, '0')}${(Math.floor(Math.abs(sin(ballRads) * modifiers[d]) * 255)).toString(16).padStart(2, '0')}`
      draw.beginPath();
      draw.ellipse(...foreground, ...size, Math.PI / 4, 0, 2 * Math.PI);
      draw.fill()
    }


  },

})
