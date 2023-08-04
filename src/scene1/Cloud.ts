import { Injector, injector } from "../pipeline/Injector.type";
import { pipeLine } from "../pipeline/Pipeline.type";
import { viewContext } from "./Canvas";
import { renderPipeline } from "./Render";
import { Sphere } from "./Sphere";

type Vec2 = [number, number]

export interface CloudInjector extends Injector {
  init(): void,
  render(delta: number): void,
  timeElapsed: number
}


export const cloudInjector: CloudInjector = injector({
  timeElapsed: 0,
  init() {
    this.timeElapsed = 0
  },
  render(delta: number) {

    if (isNaN(this.timeElapsed)) this.timeElapsed = 0

    const draw = viewContext.draw
    this.timeElapsed = (this.timeElapsed + delta) % 10000
    const { sin, cos, PI } = Math

    const apsect = viewContext.size[0] * viewContext.size[1]
    const screenSize = viewContext.size
    const screenCenter = screenSize.map((e) => e / 2)

    const progress = (((this.timeElapsed / 1000) / 10) * 360) * (PI / 180)



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



    for (var d = 0; d < 10; d++) {

      const ballProgress = progress + (d / 10)
      const size = [25, 25].map((e, i) => e + ((sin(ballProgress) / 1) * e)) as Vec2
      // Closest to the viewport
      const pointScalar = [cos, sin].map((e, i) => e(ballProgress) * [0.85, 0.5][i])
      const foreground = pointScalar.map((e, i) => screenCenter[i] + (e * screenCenter[i] * (d / 10))) as Vec2


      draw.fillStyle = "#B8B8B8"
      draw.beginPath();
      draw.ellipse(...foreground, ...size, Math.PI / 4, 0, 2 * Math.PI);
      draw.fill()
    }


  },

})
