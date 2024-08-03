const isCellInGrid = (width: number, height: number, x: number, y: number) => {
  return x >= 0 && x < width && y >= 0 && y < height;
};

export const getCellNeighbourCoordinates = (
  width: number,
  height: number,
  x: number,
  y: number
): [number, number][] => {
  if (x > width || y > height) return [];

  const neighbours: [number, number][] = [
    // above
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    // side
    [x - 1, y],
    // don't include target cell coordinates
    [x + 1, y],
    // below
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ];

  return neighbours.filter((p) => isCellInGrid(width, height, ...p));
};

type Bit = 0 | 1;

export class Grid {
  width: number;
  height: number;
  cells: Bit[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.cells = new Array(width * height).fill(0);
  }

  getCell(x: number, y: number): Bit {
    return this.cells[y * this.width + x];
  }

  setCell(x: number, y: number, value: Bit) {
    this.cells[y * this.width + x] = value;
  }

  getCellNeighboursCoordinates(x: number, y: number) {
    return getCellNeighbourCoordinates(this.width, this.height, x, y);
  }

  getCellLiveNeighboursCount(x: number, y: number) {
    const neighbours = this.getCellNeighboursCoordinates(x, y);
    const liveCount = neighbours.reduce(
      (acc, [x, y]) => acc + this.getCell(x, y),
      0
    );

    return liveCount;
  }

  forEachCell(callback: (x: number, y: number) => Bit) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.setCell(x, y, callback(x, y));
      }
    }
  }
}

interface AutomatConfig {
  width: number;
  height: number;
}

export class Automat {
  grid: Grid;

  constructor({ width, height }: AutomatConfig) {
    this.grid = new Grid(width, height);
  }

  update() {
    const updatedGrid = new Grid(this.grid.width, this.grid.height);

    for (let y = 0; y < this.grid.height; y++) {
      for (let x = 0; x < this.grid.width; x++) {
        const liveNeighboursCount = this.grid.getCellLiveNeighboursCount(x, y);
        const isLive = this.grid.getCell(x, y);

        if (isLive) {
          // 1. Any live cell with two or three live neighbours survives.
          if (liveNeighboursCount === 2 || liveNeighboursCount === 3) {
            updatedGrid.setCell(x, y, 1);
          }
        } else {
          // 2. Any dead cell with three live neighbours becomes a live cell.
          if (liveNeighboursCount === 3) {
            updatedGrid.setCell(x, y, 1);
          }
        }

        // 3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.
      }
    }

    this.grid = updatedGrid;
  }
}
