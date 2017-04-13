export const UNIT = {
  U: '',
  X: 'X',
  O: 'O',
}

let _scores
export function init(grid){
    _scores = initScoreArray(grid)
}

export function getBestMove() {
    return nextBestMove(unit, grid, _scores)
}

export function getWinner(grid) {
    for (let index = 0; index < _scores.length; index++) {
        if (Math.abs(_scores[index].score) === grid.length) {
            let [row, col] = getFirstCoordinatesFromArrayIndex(index, grid.length)
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

function initScoreArray(grid){
    // [0] Fill keeps same reference across the array. GOTO [1]
    let scores = Array((grid.length * 2) + 2).fill({
        score: 0,
        input: 0
    })

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid.length; col++) {
            updateScores(row, col, grid, scores)
        }
    }

    return scores
}

function updateScores(row, col, grid, scores) {
    if (grid[row][col] === UNIT.U)
        return scores
    
    let winner
    getIndicesToUpdate(row, col, grid.length).forEach(index => {
        // [1] Need to updated the object reference. Score object reference
        // is same for all objects in the array, on init. GOTO [0]
        scores[index] = {
            score: scores[index].score + UNIT_VAL[grid[row][col]],
            input: scores[index].input + 1
        }
        if (Math.abs(scores[index].score) === grid.length)
            winner = grid[row][col]
    })
    console.log("[UPDATE]", scores, winner)
    return winner
}

function nextBestMove(unit, grid, scores) {
    let limit = grid.length * grid.length
      , findMin = UNIT_VAL[unit] < 0
      , bestScore = findMin
            ? Math.POSITIVE_INFINITY
            : Math.NEGATIVE_INFINITY
      , bestMatch

    for (let index = 0; index < limit; index++) {
        let [row, col] = getRowColIterationIndex(index)
        if (grid[row][col] === UNIT.U) {
            let score = findScoreForMove(unit, grid, scores, row, col)
            if ((findMin && bestScore > score)
                || (!findMin && bestScore < score)) {
                bestScore = score
                bestMatch = [row, col]
            }
        }
    }

    return bestMatch
}

function findScoreForMove(unit, grid, scores, row, col) {
    let newScores = [...scores]
    let winner = updateScores(row, col, grid, newScores)

    if (winner)
        return UNIT_VAL[winner]

    let score = 0
      , newGrid = [...grid]
    newGrid[row] = [...newGrid[row]]
    newGrid[row][col] = unit

    for (let index = 0; index < limit; index++) {
        let [newRow, newCol] = getRowColIterationIndex(index)
        if (grid[newRow][newCol] === UNIT.U) {
            score += findScoreForMove(toggleUnit(unit), newGrid, newScores, newRow, newCol)
        }
    }

    return score
}

function getIndicesToUpdate(row, col, size) {
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

function getRowColIterationIndex(index, gridSize) {
    return [
        Math.floor(index / gridSize),
        index % gridSize
    ]
}

function toggleUnit(unit) {
    if (unit === UNIT.U)
        return unit

    return unit === UNIT.X ? UNIT.O : UNIT.X
}