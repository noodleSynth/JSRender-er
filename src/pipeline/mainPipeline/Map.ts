import { GameMap } from "../../game/Map"
import { viewport } from "../../game/ViewPort"
import { injector, Injector } from "../../node/Injector.type"

export interface MapInjector extends Injector {
  seed: { (): void },
  render: { (delta: number): void },
}

export const mapInjector = (): MapInjector => {

  return injector<MapInjector>({

    render(delta: number) {
      const draw = viewport.draw
      const [cellW, cellH] = GameMap.cellSize
      const [offsetL, offsetT] = GameMap.screenPos


      GameMap.cells.forEach((row, rowI) => row.forEach((col, colI) => {
        const color = Math.round((col / 6) * 255)
        // console.log(color.toString(16))

        draw.fillStyle = `#${color.toString(16)}${color.toString(16)}${color.toString(16)}`
        // draw.fillStyle = (rowI + colI) % 2 ? '#0f0f0f' : '#F0f0f0'
        draw.fillRect(...[
          offsetL + (cellW * colI),
          offsetT + (cellH * rowI),
          cellW,
          cellH
        ] as [number, number, number, number,])
      }))

    },
    seed() {
      const [countW, countH] = GameMap.size
      GameMap.cells = new Array(countH).fill([]).map((_, r) => new Array(countW).fill(0).map((_, c) => (r + c) % 6))
      console.log("Map seeded")
    }
  })
}

