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
    console.log("[UPDATE]", _scores)
}

export function getBestMove(grid, unit) {
    // If unit is positive find the minimum score to gain balance
    let direction = UNIT_VAL[unit] > 0
      , worstScore = direction
            ? Math.min.apply(null, _scores)
            : Math.max.apply(null, _scores)
      , scoreIndex = _scores.indexOf(worstScore)

    console.log('[PREDICTION]', worstScore,
        scoreIndex, getFirstCoordinatesFromArrayIndex(scoreIndex))

    if (scoreIndex === _scores.length - 2) {
        for (let index = 0; index < _size; index++) {
            if (grid[index][index] === UNIT.U)
                return [index, index]
        }
    }
    if (scoreIndex === _scores.length - 1) {
        for (let index = 0; index < _size; index++) {
            if (grid[index][_size - 1 - index] === UNIT.U)
                return [index, _size - 1 - index]
        }
    }
    if (scoreIndex % 2 === 0) {
        let row = scoreIndex / 2
        for (let col = 0; col < _size; col++) {
            if (grid[row][col] === UNIT.U)
                return [row, col]
        }
    } else {
        let col = parseInt(scoreIndex / 2)
        for (let row = 0; row < _size; row++) {
            if (grid[row][col] === UNIT.U)
                return [row, col]
        }
    }
}

export function getWinner(grid) {
    for (let index = 0; index < _scores.length; index++) {
        if (Math.abs(_scores[index]) === _size) {
            let [row, col] = getFirstCoordinatesFromArrayIndex(index, _size)
            console.log("[WINNER]", row, col, grid[row][col])
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
        return [index / 2, 0]
    else
        return [0, parseInt(index / 2)]
}