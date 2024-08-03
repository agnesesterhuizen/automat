import { getCellNeighbourCoordinates } from "./automat.ts";
import { assertEquals } from "https://deno.land/std@0.191.0/testing/asserts.ts";

const cellNeighbourCoordinatesTest = (
  width: number,
  height: number,
  x: number,
  y: number,
  expected: [number, number][]
) => ({
  width,
  height,
  x,
  y,
  expected,
});

const getCellNeighbourCoordinatesTestData = [
  cellNeighbourCoordinatesTest(0, 0, 0, 0, []),
  cellNeighbourCoordinatesTest(0, 0, 100, 100, []),
  cellNeighbourCoordinatesTest(3, 3, 1, 1, [
    //
    [0, 0],
    [1, 0],
    [2, 0],
    //
    [0, 1],
    [2, 1],
    //
    [0, 2],
    [1, 2],
    [2, 2],
  ]),
  cellNeighbourCoordinatesTest(3, 3, 0, 0, [
    //
    [1, 0],
    //
    [0, 1],
    [1, 1],
  ]),
  cellNeighbourCoordinatesTest(3, 3, 2, 0, [
    //
    [1, 0],
    //
    [1, 1],
    [2, 1],
  ]),
  cellNeighbourCoordinatesTest(3, 3, 0, 2, [
    //
    [0, 1],
    [1, 1],
    //
    [1, 2],
  ]),
  cellNeighbourCoordinatesTest(3, 3, 2, 2, [
    //
    [1, 1],
    [2, 1],
    //
    [1, 2],
  ]),
];

getCellNeighbourCoordinatesTestData.forEach(
  ({ width, height, x, y, expected }) => {
    Deno.test(
      `getCellNeighbourCoordinates: ${width}x${height}:(${x},${y})`,
      () => {
        const result = getCellNeighbourCoordinates(width, height, x, y);
        console.log(result);
        console.log(expected);
        assertEquals(result.length, expected.length);
        if (result.length === expected.length) {
          for (let i = 0; i < expected.length; i++) {
            // converting to string gives a more helpful error message on failure
            assertEquals(result[i].toString(), expected[i].toString());
          }
        }
      }
    );
  }
);
