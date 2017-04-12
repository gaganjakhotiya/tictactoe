export const UNIT = {
  U: '',
  X: 'X',
  O: 'O',
}

export function init(grid){
    prepareScoreArray(grid)
}

export function updateMove(row, col, unit) {
    getArrayIndicesForCoordinates(row, col, _size).forEach(index => {
        _scores[index] += UNIT_VAL[unit]
    })
}

export function getBestMove(unit) {
    let worstScore = UNIT_VAL[unit] > 0
            ? Math.min.apply(null, _scores)
            : Math.max.apply(null, _scores)
      , scoreIndex = _scores.indexOf(worstScore)
}

export function getWinner(grid) {
    for (let index = 0; index < _scores.length; index++) {
        if (Math.abs(_scores[index]) === _size) {
            let [row, col] = getFirstCoordinatesFromArrayIndex(index, _size)
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

let _scores, _size
function prepareScoreArray(grid){
    _size = grid.length
    _scores = Array((_size * 2) + 2).fill(0)
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
        return [0, 0]
    if (index === (2 * size) + 1)
        return [0, size - 1]
    if (index % 2 === 0)
        return [0, index / 2]
    else
        return [parseInt(index / 2), 0]    
}