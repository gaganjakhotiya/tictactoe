export const UNIT = {
  U: '',
  X: 'X',
  O: 'O',
}

const UNIT_VAL = {
    '': 0,
    'X': 1,
    'O': -1,
}

export function getWinner(grid, size) {
    let backward = 0
      , forward = 0

    for (let lineCounter = 0; lineCounter < size; lineCounter++ ) {
        let horizontal = 0
          , vertical = 0
        for (let blockCounter = 0; blockCounter < size; blockCounter++) {
            horizontal += UNIT_VAL[grid[lineCounter][blockCounter]]
            vertical += UNIT_VAL[grid[blockCounter][lineCounter]]
        }

        if (Math.abs(horizontal) === size) 
            return grid[lineCounter][0]
        if (Math.abs(vertical) === size)
            return grid[0][lineCounter]

        forward += UNIT_VAL[grid[lineCounter][lineCounter]]
        backward += UNIT_VAL[grid[lineCounter][size - 1 -lineCounter]]
    }

    if (Math.abs(forward) === size) 
        return grid[0][0]
    if (Math.abs(backward) === size)
        return grid0[0][size - 1]
}

let scores
function prepareScoreArray(grid){
    let size = grid.length

    scores = []
    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
        for (let colIndex = 0; colIndex < size; colIndex++) {
            
        }
    }
}

function getArrayIndicesForCoordinates(row, col, size) {
    let impactedIndices = [
        2 * row,
        (2 * col) + 1
    ]
    if (row === col)
        impactedIndices.push(2 * size)
    if (row + col + 1 === size)
        impactedIndices.push((2 * size) + 1)
    return impactedIndices
}