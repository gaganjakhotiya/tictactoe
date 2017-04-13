export const UNIT = {
  U: '',
  X: 'X',
  O: 'O',
}

let _scores, _size
export function init(grid){
    _scores = prepareScoreArray(grid)
    _size = grid.length
}

export function getBestMove(grid, unit) {
    // If unit is positive find the minimum score to gain balance
    let direction = UNIT_VAL[unit] > 0
      , worstScore = direction ? min(_scores) : ma(_scores)
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

export function nextBestMove(grid, unit) {
    let size = grid.length

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

function prepareScoreArray(grid){
    let scores = Array((grid.length * 2) + 2)
    scores.forEach((value, index) => {
        scores[index] = {
            score: 0,
            input: 0
        }
    })

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid.length; col++) {
            if (grid[row][col] !== UNIT.U)
                getIndicesToUpdate(row, col, grid.length).forEach(index => {
                    scores[index].score += UNIT_VAL[grid[row][col]]
                    scores[index].input += 1
                })
        }
    }

    return scores
}

function updateScores(row, col, grid, scores) {
    let size = grid.length
    
    getIndicesToUpdate(row, col, size).forEach(index => {
        scores[index] += UNIT_VAL[grid[row][col]]
    })
    for (let counter = 0; counter < size; counter++) {
        if (grid[row][counter] === UNIT.U) {
            break
        } else if (counter + 1 === size) {
            scores[2 * row] = scores[2 * row] === size ? 'W' : 'D'
        }
    }
    for (let counter = 0; counter < size; counter++) {
        if (grid[counter][col] === UNIT.U) {
            break
        } else if (counter + 1 === size) {
            scores[(2 * col) + 1] = scores[(2 * col) + 1] === size ? 'W' : 'D'
        }
    }
    console.log("[UPDATE]", scores)
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

function min(list) {
    list.reduce((last, score) => {
        ['D', 'W'].indexOf(score) === 1
            ? last
            : last < score
                ? last
                : score
    }, Number.POSITIVE_INFINITY)
}

function max(list) {
    list.reduce((last, score) => {
        ['D', 'W'].indexOf(score) === 1
            ? last
            : last > score
                ? last
                : score
    }, Number.NEGATIVE_INFINITY)
}