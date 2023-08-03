export const GameMap = {
  cells: [] as number[][],

  // The amount of rows and items in a row [rows, columns]  
  get size() {
    return [10, 10]
  },

  // The intended pixel size for the map
  get cellSize() {
    return [50, 50]
  },

  // The total pixel dimensions for the map
  get dimensions() {
    return this.size.map((e, i) => this.cellSize[i] * e)
  },

  // The intended location on the screen
  get screenPos() {
    return [100, 100]
  },

  // Get the cell in the [x, y] position of the grid
  cell(coords: number[]) {
    const [x, y] = this.toMapSpace(coords)
    return this.cells[y][x]
  },

  // Converting an [x, y] coordinate pair to the exact cell 
  toMapSpace(coords: number[]) {
    return coords.map((e) => Math.ceil(e - 0.5)).map((e) => Math.max(e, 0))
  },

  toScreenSpace(coords: number[]) {
    return coords.map((e, i) => (this.cellSize[i] * e) + this.screenPos[i])
  }
}