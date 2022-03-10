// We need access to sizes so create CSS varibles in JS
const GRID_SIZE = 4; //Change grid size. Now 4 x 4
const CELL_SIZE = 20;
const CELL_GAP = 2;

export default class Grid {
    #cells      // private variable
    
  constructor(gridElement) {
    gridElement.style.setProperty("--grid-size", GRID_SIZE);
    gridElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`); //Convet to vmin
    gridElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);
    this.#cells = createCellElements(gridElement).map((cellElements, index) => {
      return new Cell(
        cellElements,
        index % GRID_SIZE,
        Math.floor(index / GRID_SIZE)
      );
    });
  }
}

class Cell {
    #cellElement
    #x
    #y
    
  constructor(cellElement, x, y) {
    this.#cellElement = cellElement;
    this.#x = x;
    this.#y = y;
  }
}

function createCellElements(gridElement) {
  const cells = [];
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cells.push(cell);
    gridElement.append(cell);
  }
  return cells;
}
