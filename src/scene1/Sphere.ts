import { Injector, injector } from "../core/pipeline/Injector.type";
import { viewContext } from "./Canvas";
import { LifeCycleInjector } from "./Render";


type Vec2 = [number, number]

export interface SphereInjector extends LifeCycleInjector {
  render(delta: number): void
}


export const Sphere: SphereInjector = injector({

  render(delta: number) {
    const { draw, size, aspectRatio } = viewContext


    const [x, y, w] = [
      ...size.map((e, i) => (e * .5)),
      size[1] * 0.20
    ]

    draw.strokeStyle = '#FFFFFF'
    draw.fillStyle = '#000000'
    draw.lineWidth = 16 * aspectRatio[0]
    draw.beginPath();
    draw.ellipse(x, y, w, w, Math.PI / 4, 0, 2 * Math.PI);
    draw.stroke();

    draw.beginPath();
    draw.ellipse(x - (w * 0.08), y - (w * 0.08), w, w, Math.PI / 4, 0, 2 * Math.PI);
    draw.fill();
  },

})