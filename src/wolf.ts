import { mutateRenderNode } from "./node/RenderNode.type";
import { spawnSeedNode } from "./node/SeedNode.type";
import { rootNode } from "./scene/RootNode";
import { viewport } from "./game/ViewPort";

const camera = {
  get FOV() {
    return 70
  }
}

var map = {
  cells: [] as number[][],

  get size() {
    return [10, 10]
  },

  get cellSize() {
    return [50, 50]
  },

  get dimensions() {
    return this.size.map((e, i) => this.cellSize[i] * e)
  },

  get screenPos() {
    return [100, 100]
  },

  cell(coords: number[]) {
    const [x, y] = this.mapSpace(coords)
    return this.cells[y][x]
  },

  mapSpace(coords: number[]) {
    return coords.map((e) => Math.ceil(e - 0.5)).map((e) => Math.max(e, 0))
  }
}

const player = {
  _position: [.0, .0],

  direction: 0,
  get position() {
    return this._position
  },
  set position(coords: number[]) {
    this._position = coords.map((e, i) => Math.max(Math.min((map.size[i] - 1), e), 0))
  },

  get mapPosition() {
    return this.position.map((e, i) => (e * map.cellSize[i]))
  }
}
const rayCount = 20
const zStep = 20
const castIntervals = 50
var keyPressed: string | undefined = undefined

export const mapNode = mutateRenderNode(spawnSeedNode("Minimap", () => {
  const [mapW, mapH] = map.size
  map.cells = new Array(mapW).fill(0).map(e => Array(mapH).fill(0).map(() => Math.max(Math.round(Math.random() * 10), 2)))

  window.addEventListener("keydown", (e) => {
    const event = e as KeyboardEvent
    keyPressed = event.key
  })

  window.addEventListener("keyup", () => {
    player.position = player.position//.map(Math.round)
    keyPressed = undefined
  })

}), (delta) => {
  const [mapW, mapH] = map.size
  const [mapWpx, mapHpx] = map.dimensions
  const [mapXoff, mapYoff] = map.screenPos
  const [cellW, cellH] = map.cellSize

  const draw = viewport.draw
  const lookRads = player.direction * (Math.PI / 180)
  const look = [Math.cos(lookRads), Math.sin(lookRads)]

  map.cells.forEach((row, rowI) => row.map((col, colI) => {
    const colourShift = Math.round((col / mapW) * 255).toString(16)
    draw.fillStyle = (rowI + colI) % 2 ? '#0f0f0f' : '#F0F0F0'//`#00${colourShift}FF` // (rowI + colI) % 2 ? `#00${colourShift}0F` :

    draw.fillRect(mapXoff + (colI * cellW), mapYoff + (rowI * cellH), cellW, cellH)
    draw.fillStyle = (rowI + colI) % 2 ? '#FFFFFF' : '#000000'

    draw.fillText(col.toString(), mapXoff + (colI * cellW) + (cellW / 2), mapYoff + (rowI * cellH) + (cellH / 2))
  }))

  const [px, py] = player.position

  const screenLocation = player.mapPosition.map((e, i) => map.screenPos[i] + e + (0.5 * map.cellSize[i]))

  draw.fillStyle = `#FF0000`
  draw.strokeStyle = `#00000000`
  draw.beginPath();
  draw.ellipse(...screenLocation as [number, number], 5, 5, Math.PI / 4, 0, 2 * Math.PI);
  draw.stroke();
  draw.fill();

  draw.strokeStyle = "#FF0000"
  const cell = map.cell(player.position)
  const lookingCell = map.cell(player.position.map((e, i) => look[i] + e))

  player.position = [
    ((keyPressed === 'd' ? 1 : 0) * delta) +
    ((keyPressed === 'a' ? 1 : 0) * -delta),
    ((keyPressed === 's' ? 1 : 0) * delta) +
    ((keyPressed === 'w' ? 1 : 0) * -delta)
  ].map((e, i) => delta * e * (map.cellSize[i] / 2)).map((e, i) => (player.position[i] + e))

  player.direction = player.direction + ((keyPressed === "ArrowLeft" ? 1 : 0) * (delta * 50)) + ((keyPressed === "ArrowRight" ? -1 : 0) * (delta * 50))

  draw.strokeText((player.position).map(e => e.toFixed(2)).join(" | "), 50, 100)
  draw.strokeText((map.mapSpace(player.position)).map(e => e.toFixed(2)).join(" | "), 50, 120)
  draw.strokeText((look).map(e => e.toFixed(2)).join(" | "), 50, 140)
  draw.strokeText(`cell: ${cell}`, 50, 150)
  draw.strokeText(`Tcell: ${lookingCell}`, 50, 160)

  const lookVec = look.map((e, i) => screenLocation[i] + (map.cellSize[i] * e))

  if (lookingCell % 4 === 0)
    draw.fillStyle = "#FF00ff"
  else if (lookingCell > 5)
    draw.fillStyle = "#00ffff"
  else
    draw.fillStyle = "#00ff00"
  draw.beginPath();
  draw.ellipse(...lookVec as [number, number], 5, 5, Math.PI / 4, 0, 2 * Math.PI);
  draw.stroke();
  draw.fill();





  // const [rx, ry] = look.map(e => e*50)

  // draw.strokeStyle = `#FFFFFF`
  // draw.lineWidth = 1
  // draw.beginPath()
  // draw.moveTo(mapX, mapY)
  // draw.lineTo(mapX + rx, mapY + ry)
  // draw.stroke()

  // const FOVDiv = (Math.PI / 180) * (camera.FOV / 2)
  // const [rx1, ry1] = [Math.cos(lookRads + FOVDiv), Math.sin(lookRads + FOVDiv)].map(e => e * 50)
  // const [rx2, ry2] = [Math.cos(lookRads - FOVDiv), Math.sin(lookRads - FOVDiv)].map(e => e * 50)

  // draw.strokeStyle = `#FF0000`
  // draw.lineWidth = 1

  // draw.beginPath()
  // draw.moveTo(mapX, mapY)
  // draw.lineTo(mapX + rx1, mapY + ry1)
  // draw.stroke()

  // draw.moveTo(mapX, mapY)
  // draw.lineTo(mapX + rx2, mapY + ry2)
  // draw.stroke()

  // draw.strokeText(look.map(e => e.toFixed(2)).join(" | "), 50, 100)
  // draw.strokeText(player.position.map(e => e.toFixed(2)).join(" | "), 50, 120)

  // for (var rayStep = 0; rayStep < zStep; rayStep++){
  //   const stepDistance = player.position.map((e, i) => e + look[i] + (1 * (rayStep / zStep)))
  //   const hitCell = map.cell(stepDistance)
  //   draw.fillStyle = `#00ff00`
  //   draw.beginPath();

  //   if (hitCell > 5) {
  //     draw.fillStyle = `#FF0000`
  //     const realDistance = stepDistance.map((e, i) => e - player.position[i])//.map((e) => (Math.floor(e))).map((e) => Math.max(e, 0))
  //     draw.strokeText(hitCell.toString() + " | " + stepDistance.map((e, i) => e.toFixed(2)).join(" | ") + " || " + realDistance.join(" | "), 900, 100 + (rayStep * 20))
  //     draw.ellipse(...realDistance.map((e, i) => [mapX, mapY][i] + ((e) * map.cellSize[i])) as [number, number], 2, 2, Math.PI / 4, 0, 2 * Math.PI);
  //     draw.stroke();
  //     draw.fill();
  //     break
  //   }
  //   draw.strokeText(hitCell.toString() + " | " + stepDistance.map((e, i) => e.toFixed(2)).join(" | ") + " || " + stepDistance.map((e) => (Math.floor(e))).map((e) => Math.max(e, 0)).join(" | ") , 900, 100 + (rayStep * 20))
  //   draw.ellipse(...look.map((e, i) => player.mapPosition[i] + (e * map.cellSize[i])) as [number, number], 2, 2, Math.PI / 4, 0, 2 * Math.PI);
  //   draw.stroke();
  //   draw.fill();
  // }

  return
  new Array(rayCount).fill(0).map((_, rayIndex) => {

    const [rxe, rye] = [Math.cos(lookRads + ((FOVDiv * (rayIndex / rayCount) * 2) - FOVDiv)), Math.sin(lookRads + ((FOVDiv * (rayIndex / rayCount) * 2) - FOVDiv))]
    const [rxr, ryr] = [rxe, rye].map((e, i) => (e * castIntervals * zStep))
    draw.fillStyle = `#00f0f0`
    draw.strokeStyle = `#00f0f0`
    draw.lineWidth = 1


    draw.beginPath()
    draw.moveTo(mapX, mapY)
    draw.lineTo(mapX + rxr, mapY + ryr)
    draw.stroke()

    const cell = map.cell([rxe, rye].map((e, i) => player.position[i] + e))
    draw.strokeText(cell.toString() + " " + [rxe, rye].map((e, i) => Math.ceil(player.position[i] + e).toFixed(2)), 900, 100 + (rayIndex * 20))

    for (var intervalIndex = 0; intervalIndex < castIntervals; intervalIndex++) {
      const [rx, ry] = [rxe, rye].map((e, i) => player.position[i] + e)

      const [rrx, rry] = [rxe, rye].map((e, i) => e * ((intervalIndex + 0.2) * zStep)).map((e, i) => player.position[i] + e).map(Math.floor)


      const cell = map.cell([rx, ry].map((e, i) => Math.max(Math.min((map.size[i] - 1), e), 0)))

      draw.fillStyle = `#00ff00`

      if (cell > 5)
        break

      draw.fillStyle = `#00ff00`
      draw.beginPath();
      draw.ellipse(rrx + mapX, rry + mapY, 2, 2, Math.PI / 4, 0, 2 * Math.PI);
      draw.stroke();
      draw.fill();
    }
  })

}, undefined)
