import { Automat, Grid } from "./automat.ts";

const renderGrid = (grid: Grid) => {
  let out = "";
  for (let y = 0; y < grid.height; y++) {
    let line = "";
    for (let x = 0; x < grid.width; x++) {
      line += grid.cells[y * grid.width + x] ? "0" : ".";
    }

    out += line;
    out += "\n";
  }

  console.log("\x1Bc");
  console.log(out);
  out = "";
};

// !Name: Gosper glider gun
// !
const pattern = `
........................O...........
......................O.O...........
............OO......OO............OO
...........O...O....OO............OO
OO........O.....O...OO..............
OO........O...O.OO....O.O...........
..........O.....O.......O...........
...........O...O....................
............OO......................
`.trim();

const chars = pattern.split("").filter((x) => x.trim());

const patternLines = pattern.split("\n");
const width = patternLines[0].length;
const height = patternLines.length;

const a = new Automat({ width: width, height: height });

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = y * width + x;
    a.grid.setCell(x, y, chars[i] !== "." ? 1 : 0);
  }
}

renderGrid(a.grid);

setInterval(() => {
  a.update();
  renderGrid(a.grid);
}, 1 / 15);
