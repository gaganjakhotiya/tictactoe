export const UNIT = {
  U: '',
  X: 'X',
  O: 'O',
}

export function init(grid){
    prepareScoreArray(grid)
}

export function getWinner(grid) {
    let size = grid.length
    for (let index = 0; index < scores.length; index++) {
        if (Math.abs(scores[index]) === size) {
            let [row, col] = getFirstCoordinatesFromArrayIndex(index, size)
            return grid[row][col]
        }
    }
}

// Private stuff

const UNIT_VAL = {
    '': 0,
    'X': 1,
    'O': -1,
}

let scores
function prepareScoreArray(grid){
    let size = grid.length

    scores = Array((size*2) + 2).fill(0)
    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
        for (let colIndex = 0; colIndex < size; colIndex++) {
            getArrayIndicesForCoordinates(rowIndex, colIndex, size).forEach(index => {
                scores[index] += UNIT_VAL[grid[rowIndex][colIndex]]
            })
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

function getFirstCoordinatesFromArrayIndex(index, size) {
    if (index === 2 * size)
        return [0,0]
    if (index === (2 * size) + 1)
        return [0, size - 1]
    if (index % 2 === 0)
        return [0, index / 2]
    else
        return [parseInt(index / 1), 0]    
}