import { camera } from "../../game/Camera"
import { GameMap } from "../../game/Map"
import { GamerPlayer as GamePlayer } from "../../game/Player"
import { viewport } from "../../game/ViewPort"
import { injector, Injector } from "../../node/Injector.type"

export interface CameraInjector extends Injector {
  render: { (delta: number): void },
  update: { (delta: number): void },
  seed: { (): void }
}

const rayMax = 100

export const cameraInjector = (): CameraInjector => {

  return injector<CameraInjector>({

    render(delta: number) {

      const draw = viewport.draw
      const screenSize = viewport.size
      const cRads = (GamePlayer.direction) * (Math.PI / 180)

      // const realDistance = offsetDistance - deltaDistance

      // const mapCell = GameMap.toMapSpace(offsetPoint)


      const [lx, ly] = [Math.cos(cRads), Math.sin(cRads)]
        .map((e, i) => Math.sign(e) * (Math.min(Math.abs(e), 1)))

      const intersectTargets = [lx, ly].map((e, i) => Math.sign(e))

      const xSect = [intersectTargets[0], ((ly / lx) / intersectTargets[0])]
      const ySect = [(intersectTargets[1] / (ly / lx)), Math.sign(intersectTargets[1])]

      const meanDistance = ([a, b]: [number, number]) => Math.pow(a, 2) + Math.pow(b, 2)

      const resultVector = (meanDistance(ySect) <= meanDistance(xSect)) ? ySect : xSect

      const distanceScalar = GamePlayer.position.map((e, i) => e - Math.floor(e)).map((e, i) => resultVector[i] + e)
      const distance: number = Math.sqrt(meanDistance(distanceScalar))

      // console.log({i, distance}, intersectTargets)

      draw.strokeStyle = "#FFFF00"
      draw.strokeText(`distanceScalar: ${distanceScalar.map(e => e.toFixed(2))}`, 1050, 80)
      draw.strokeText(`resultVector: ${resultVector.map(e => e.toFixed(2))}`, 1050, 100)
      draw.strokeText(`ySect: ${ySect.map(e => e.toFixed(2))}`, 1050, 120)
      draw.strokeText(`Look: ${[lx, ly].map(e => e.toFixed(2))}`, 1050, 140)
      draw.strokeText(`Distace: ${distance.toFixed(2)}`, 1050, 160)
      // draw.strokeText(`Q: ${pDelta.map((e, i) => (e).toFixed(2))}`, 1050, 180)

      for (var w = 0; w < rayMax; w++) {
        const lookRads = (GamePlayer.direction - (camera.fieldOfView / 2) + (camera.fieldOfView * (w / rayMax))) * (Math.PI / 180)
        const look = [Math.cos(lookRads), Math.sin(lookRads)]
        const offsetPoint = look.map((e, i) => GamePlayer.position[i] + e)
        const mapCell = GameMap.toMapSpace(offsetPoint)

        const [lx, ly] = look
          .map((e, i) => Math.sign(e) * (Math.min(Math.abs(e), 1)))

        const intersectTargets = [lx, ly].map((e, i) => Math.sign(e))

        const xSect = [intersectTargets[0], ((ly / lx) / intersectTargets[0])]
        const ySect = [(intersectTargets[1] / (ly / lx)), Math.sign(intersectTargets[1])]

        const meanDistance = ([a, b]: [number, number]) => Math.pow(a, 2) + Math.pow(b, 2)

        const resultVector = (meanDistance(ySect) <= meanDistance(xSect)) ? ySect : xSect

        const distanceScalar = GamePlayer.position.map((e, i) => e - Math.floor(e)).map((e, i) => resultVector[i] * e)
        const distance: number = Math.sqrt(meanDistance(distanceScalar))


        // console.log({ lookRads, look, offsetPoint, mapCell })

        const cell = GameMap.cell(mapCell)
        // const distance = ((([x, y]) => {
        //   return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
        // })(mapCell.map((e, i) => (i - GamePlayer.position[e]) * GameMap.cellSize[i])) / camera.zFar) + camera.zNear


        const color = 30 + Math.round(((cell / 6) * 255 * distance))
        // console.log(color.toString(16))

        const midSpan = (2 / 3) * screenSize[1]

        if (cell > 3) {
          draw.fillStyle = `#${color.toString(16)}${color.toString(16)}${color.toString(16)}`
          draw.fillRect((w / rayMax) * screenSize[0] - 5, (screenSize[1] / 2) - ((1 - distance) * midSpan), (screenSize[0] / rayMax) + 5, ((1 - distance) * midSpan * 2))

        }
      }

    },
    update(delta: number) {

    },
    seed() {
    }
  })
}

