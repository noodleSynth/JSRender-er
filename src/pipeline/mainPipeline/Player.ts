import { GameMap } from "../../game/Map"
import { GamerPlayer as GamePlayer } from "../../game/Player"
import { viewport } from "../../game/ViewPort"
import { injector, Injector } from "../../node/Injector.type"

export interface PlayerInjector extends Injector {
  render: { (delta: number): void },
  update: { (delta: number): void },
  seed: { (): void }
}

var keyPressed: string | undefined = undefined

export const playerInjector = (): PlayerInjector => {

  return injector<PlayerInjector>({

    render(delta: number) {

      const draw = viewport.draw
      const [mapX, mapY] = GameMap.toScreenSpace(GamePlayer.position)

      draw.strokeText((GamePlayer.position).map(e => e.toFixed(2)).join(" | "), 50, 100)
      draw.strokeText((GameMap.toMapSpace(GamePlayer.position)).map(e => e.toFixed(2)).join(" | "), 50, 120)

      draw.fillStyle = "#FF9090"
      draw.beginPath();
      draw.ellipse(mapX, mapY, 10, 10, Math.PI / 4, 0, 2 * Math.PI);
      draw.fill();
      draw.fillStyle = "#FF0000"
      draw.beginPath();
      draw.ellipse(mapX, mapY, 5, 5, Math.PI / 4, 0, 2 * Math.PI);
      draw.fill();

      const lookRads = GamePlayer.direction * (Math.PI / 180)
      const look = [Math.cos(lookRads), Math.sin(lookRads)]

      const lookVec = look.map((e, i) => [mapX, mapY][i] + (GameMap.cellSize[i] * e))
      draw.beginPath();
      draw.ellipse(...lookVec as [number, number], 5, 5, Math.PI / 4, 0, 2 * Math.PI);
      draw.stroke();
      draw.fill();


      // Look things

      // const realDistance = offsetDistance - deltaDistance

      // const mapCell = GameMap.toMapSpace(offsetPoint)


      // .map((e, i) => Math.sign(e) * (Math.min(Math.abs(e), 1)))

      const intersectTargets = look.map((e, i) => (Math.sign(e) + 1) / 2)
      const cellTargets = intersectTargets.map((e, i) => (GamePlayer.position[i] - Math.floor(GamePlayer.position[i])) + e)
      const worldIntersects = intersectTargets.map((e, i) => Math.floor(GamePlayer.position[i] + e))

      const slope = (look[1] / look[0])
      const ySect = [intersectTargets[0], (slope / intersectTargets[0])]
      const xSect = [(worldIntersects[1] / slope), worldIntersects[1]]

      const meanDistance = ([a, b]: [number, number]) => Math.pow(a, 2) + Math.pow(b, 2)

      const resultVector = (meanDistance(ySect) <= meanDistance(xSect)) ? ySect : xSect

      const distanceScalar = GamePlayer.position.map((e, i) => e - Math.floor(e)).map((e, i) => resultVector[i] + e)
      const distance: number = Math.sqrt(meanDistance(distanceScalar))

      draw.strokeStyle = "#00FF00"
      draw.beginPath()
      draw.moveTo(((worldIntersects[0]) * GameMap.cellSize[0]) + GameMap.screenPos[0], 0)
      draw.lineTo(((worldIntersects[0]) * GameMap.cellSize[0]) + GameMap.screenPos[0], viewport.size[1])
      draw.stroke()
      draw.beginPath()
      draw.moveTo(0, ((worldIntersects[1]) * GameMap.cellSize[1]) + GameMap.screenPos[1])
      draw.lineTo(viewport.size[0], ((worldIntersects[1]) * GameMap.cellSize[1]) + GameMap.screenPos[1])
      draw.stroke()

      draw.strokeStyle = "#FFFF00"
      draw.strokeText(`intersectTargets: ${intersectTargets.map(e => e.toFixed(2))}`, 1050, 80)
      // draw.strokeText(`resultVector: ${resultVector.map(e => e.toFixed(2))}`, 1050, 100)
      draw.strokeText(`xSect: ${xSect.map(e => e.toFixed(2))}`, 1050, 120)
      draw.strokeText(`Bungus: ${GamePlayer.position.map(e => [e.toFixed(2), Math.floor(e), (e - Math.floor(e)).toFixed(2)]).join(" <> ")}`, 1050, 140)
      draw.strokeText(`Distace: ${(distance).toFixed(2)}`, 1050, 160)

      draw.strokeStyle = "#0000FF"

      // draw.beginPath();
      // draw.ellipse(((worldIntersects[0] + xSect[0]) * GameMap.cellSize[0]) + GameMap.screenPos[0], ((cellTargets[1]) * GameMap.cellSize[1]) + GameMap.screenPos[1], 5, 5, Math.PI / 4, 0, 2 * Math.PI);
      // draw.stroke();
      // draw.fill();

      // draw.beginPath();
      // draw.ellipse(...ySect.map((e, i) => GameMap.screenPos[i] + (GameMap.cellSize[i] * e)) as [number, number], 5, 5, Math.PI / 4, 0, 2 * Math.PI);
      // draw.stroke();
      // draw.fill();

    },
    update(delta: number) {
      const lookRads = GamePlayer.direction * (Math.PI / 180)
      const look = [Math.cos(lookRads), Math.sin(lookRads)]
      const pressDir = (((keyPressed === 'w' ? 1 : 0) * delta) +
        ((keyPressed === 's' ? 1 : 0) * -delta))

      GamePlayer.position = GamePlayer.position.map((e, i) =>
      (((GameMap.cellSize[i] / 100) * look[i] *
        pressDir) +
        e)
      )

      GamePlayer.direction = GamePlayer.direction + ((keyPressed === "ArrowLeft" ? 1 : 0) * (delta * 90)) + ((keyPressed === "ArrowRight" ? -1 : 0) * (delta * 90))
    },
    seed() {
      window.addEventListener("keydown", (e) => {
        const event = e as KeyboardEvent
        keyPressed = event.key
      })

      window.addEventListener("keyup", () => {
        keyPressed = undefined
      })
    }
  })
}

