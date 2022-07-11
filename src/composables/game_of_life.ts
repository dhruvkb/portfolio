import { ref, watchEffect, type Ref } from 'vue'

import seeds from '@/data/game_of_life_seeds.json'

export type Point = [number, number]

/**
 * Given the current state of the board, calculate the number of neighbours of a cell. This does not
 * loop around the board so cells have fewer neighbours at the edges.
 *
 * @param matrix - the current state of the board
 * @param point - the column, row indices of the cell
 */
const getNeigbourCount = (matrix: boolean[][], point: Point): number => {
  const [column, row] = point
  const columns = matrix.length
  const rows = matrix[0].length

  const neighbours: boolean[] = []
  for (let i = Math.max(0, column - 1); i <= Math.min(columns - 1, column + 1); i += 1) {
    for (let j = Math.max(0, row - 1); j <= Math.min(rows - 1, row + 1); j += 1) {
      if (i !== column || j !== row) neighbours.push(matrix[i][j])
    }
  }

  return neighbours.filter((element) => element).length
}

/**
 * Given the current state of the board, compute the board as it would look after one tick.
 *
 * @param matrix - the current state of the board
 * @return the board as it would look after one tick
 */
const getNextState = (matrix: boolean[][]) => {
  const columns = matrix.length
  const rows = matrix[0].length
  const board = Array.from(Array(columns), () => new Array(rows))

  for (let i = 0; i < columns; i += 1) {
    for (let j = 0; j < rows; j += 1) {
      const neighbourCount = getNeigbourCount(matrix, [i, j])
      if (neighbourCount === 3) board[i][j] = true
      else if (matrix[i][j] && neighbourCount === 2) board[i][j] = true
      else board[i][j] = false
    }
  }

  return board
}

/**
 * Generate a game of life board with the given dimensions.
 *
 * @param columns - the number of horizontal cells that can be accommodated
 * @param rows - the number of vertical cells that can be accommodated
 * @return a board with the given dimensions and some initial state
 */
const generateBoard = (columns: number, rows: number): boolean[][] | null => {
  const { big, small } = seeds

  if (columns < small.columns || rows < small.rows) return null

  const array = Array.from(Array(columns), () => new Array(rows))
  const dataSet = (columns >= big.columns && rows >= big.rows) ? big : small
  const xOffset = Math.floor((columns - dataSet.columns) / 2)
  const yOffset = Math.floor((rows - dataSet.rows) / 2)
  dataSet.points.forEach(([i, j]) => {
    array[xOffset + i][yOffset + j] = true
  })

  return array
}

export const useGameOfLife = (columns: Ref<number> | number, rows: Ref<number> | number) => {
  const columnCount = ref(columns)
  const rowCount = ref(rows)

  const board = ref<boolean[][] | null>(null)
  watchEffect(() => {
    board.value = generateBoard(columnCount.value, rowCount.value)
  })

  const updateBoard = () => {
    if (board.value) board.value = getNextState(board.value)
  }
  const updateLoop = () => setTimeout(() => {
    updateBoard()
    updateLoop()
  }, 500)

  return {
    board,
    updateLoop,
  }
}
