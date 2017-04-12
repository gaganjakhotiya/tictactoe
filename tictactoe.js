export const UNIT = {
  U: '',
  X: 'X',
  O: 'O',
}

export function getWinner(grid, size) {
    let lead
    for (let counter = 0; counter < size; counter++ ) {
        lead = grid[counter][0]
        for (let horizontalCounter = 0; horizontalCounter < size; horizontalCounter++) {
            if (grid[counter][horizontalCounter] === UNIT.U
                || grid[counter][horizontalCounter] !== lead) {
                break
            } else if (horizontalCounter === size - 1) {
                return lead
            }
        }

        lead = grid[0][counter]
        for (let verticalCounter = 0; verticalCounter < size; verticalCounter++) {
            if (grid[verticalCounter][counter] === UNIT.U
                || grid[verticalCounter][counter] !== lead) {
                break
            } else if (verticalCounter === size - 1) {
                return lead
            }
        }
    }

    lead = grid[0][0]
    for (let positionIndex = 0; positionIndex < size; positionIndex++) {
        if (grid[positionIndex][positionIndex] === UNIT.U
            || grid[positionIndex][positionIndex] !== lead) {
            break
        } else if (positionIndex === size - 1) {
            return lead
        }
    }

    lead = grid[0][size - 1 - 0]
    for (let positionIndex = 0; positionIndex < size; positionIndex++) {
        if (grid[positionIndex][size - 1 - positionIndex] === UNIT.U
            || grid[positionIndex][size - 1 - positionIndex] !== lead) {
            break
        } else if (positionIndex === size - 1) {
            return lead
        }
    }
}