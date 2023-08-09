import { type Control, control } from "../core/control/Control.type";
import { Injector, injector } from "../core/pipeline/Injector.type";
import { pipeLine } from "../core/pipeline/Pipeline.type";
import { viewContext } from "./Canvas";
import { LifeCycleInjector, renderPipeline } from "./Render";
import { Sphere } from "./Sphere";

type Vec2 = [number, number]

export interface CloudInjector extends LifeCycleInjector {
  init(): void,
  render(delta: number): void,
  timeElapsed: number,
  duration?: Control<number>
  separation?: Control<number>
}


export const cloudInjector: CloudInjector = injector({
  timeElapsed: 0,
  init() {
    this.timeElapsed = 0
    this.duration = control("Duration", 2)
    this.separation = control("Separation", 10)
    this.deviation = control("Deviation", 50)
  },
  render(delta: number) {

    if (isNaN(this.timeElapsed)) this.timeElapsed = 0

    const draw = viewContext.draw

    this.timeElapsed = (this.timeElapsed + (delta / 1000))
    if (this.timeElapsed > this.duration.value) this.timeElapsed = -0.1
    const { sin, cos, PI } = Math

    const screenSize = viewContext.size
    const screenCenter = screenSize.map((e) => e / 2)

    const progress = (this.timeElapsed / this.duration.value)



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



    viewContext.draw.fillStyle = "#FF0000"
    viewContext.draw.fillText(`Progress: ${(progress * 100).toFixed(2).toString()}`, ...[100, 120].map((e, i) => viewContext.aspectRatio[i] * e))

    const size = [25, 25].map((e, i) => e * (1 + sin(progress * (Math.PI))) / 2) as Vec2
    // Closest to the viewport

    const foreground = [viewContext.size[0], screenCenter[1]].map((e, i) => i ? screenCenter[1] + (e * sin(progress * (Math.PI)) * ((this.deviation.value - 50) / 50)) : e * progress)


    draw.fillStyle = "#B8B8B8"
    draw.beginPath();
    draw.ellipse(...foreground, ...size, Math.PI / 4, 0, 2 * Math.PI);
    draw.fill()



  },

})
