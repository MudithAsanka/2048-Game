import Grid from "./Grid.js"
import Tile from "./Tile.js"

const gameBoard = document.getElementById("game-board")

const grid = new Grid(gameBoard)
// console.log(grid.randomEmptyCell())
grid.randomEmptyCell().tile = new Tile(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)
setupInput()
console.log(grid.cellsByColumn)

function setupInput() {
    window.addEventListener("keydown", handleInput, { once: true })      // run once
}

async function handleInput(e) {
    console.log(e.key)
    switch (e.key) {
        case "ArrowUp":
            await moveUp()
            break
        case "ArrowDown":
            await moveDown()
            break
        case "ArrowLeft":
            await moveLeft()
            break
        case "ArrowRight":
            await moveRight()
            break
        default:
            setupInput()        // not key pressed wait for another
            return
    }                           // await until finish to go to next

    grid.cells.forEach(cell => cell.mergeTiles())

    const newTile = new Tile(gameBoard)
    grid.randomEmptyCell().tile = newTile       // create new tile at a random cell   

    setupInput()
}

function moveUp() {
    return slideTiles(grid.cellsByColumn)
}

function moveDown() {
    return slideTiles(grid.cellsByColumn.map(column => [...column].reverse()))
}

function moveLeft() {
    return slideTiles(grid.cellsByRow)
}

function moveRight() {
    return slideTiles(grid.cellsByRow.map(row => [...row].reverse()))
}

function slideTiles(cells) {
    return Promise.all(
        cells.flatMap(group => {
            const promises = []
            for(let i = 1; i < group.length; i++) {
                const cell = group[i]
                if (cell.tile == null) continue
                let lastValidCell
                for (let j = i - 1; j >= 0; j--){
                    const moveToCell = group[j]
                    if (!moveToCell.canAccept(cell.tile)) break     // if can't move -> can't move
                    lastValidCell = moveToCell
                }
                if (lastValidCell != null) {
                    promises.push(cell.tile.waitForTransition())
                    if(lastValidCell.tile != null){
                        lastValidCell.mergeTile = cell.tile
                    } else {
                        lastValidCell.tile = cell.tile
                    }
                    cell.tile = null
                }
            }
            return promises
        })
    )
}