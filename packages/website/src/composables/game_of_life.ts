import { ref, watchEffect, type Ref } from 'vue'

import { areEqual } from '@/utils/array'

import seeds from '@/data/game_of_life_seeds.json'

export type Point = [number, number]

/**
 * Given the current state of the board, calculate the number of neighbours of a cell. This does not
 * loop around the board so cells have fewer neighbours at the edges.
 *
 * @param matrix - the current state of the board
 * @param point - the column, row indices of the cell
 * @return the number of neighbours of the given point
 */
const getNeigbourCount = (matrix: boolean[][], point: Point): number => {
  const [column, row] = point

  const cll = Math.max(0, column - 1)
  const cul = Math.min(matrix.length - 1, column + 1)
  const rll = Math.max(0, row - 1)
  const rul = Math.min(matrix[0].length - 1, row + 1)

  const neighbours: boolean[] = []
  for (let i = cll; i <= cul; i += 1) {
    for (let j = rll; j <= rul; j += 1) {
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
const getNextState = (matrix: boolean[][]): boolean[][] => {
  const columns = matrix.length
  const rows = matrix[0].length
  const board = Array.from(Array(columns), () => new Array(rows))

  for (let i = 0; i < columns; i += 1) {
    for (let j = 0; j < rows; j += 1) {
      const neighbourCount = getNeigbourCount(matrix, [i, j])
      board[i][j] =
        neighbourCount === 3 || (matrix[i][j] && neighbourCount === 2)
    }
  }

  return board
}

/**
 * Generate a game of life board with the given dimensions. Returns `null` if
 * the number of columns or rows is insufficient to show 404.
 *
 * @param columns - the number of horizontal cells that can be accommodated
 * @param rows - the number of vertical cells that can be accommodated
 * @return a board with the given dimensions and some initial state
 */
const generateBoard = (columns: number, rows: number): boolean[][] | null => {
  const { big, small } = seeds

  if (columns < small.columns || rows < small.rows) return null

  const array = Array.from(Array(columns), () => new Array(rows))
  const dataSet = columns >= big.columns && rows >= big.rows ? big : small
  const xOffset = Math.floor((columns - dataSet.columns) / 2)
  const yOffset = Math.floor((rows - dataSet.rows) / 2)
  dataSet.points.forEach(([i, j]) => {
    array[xOffset + i][yOffset + j] = true
  })

  return array
}

export const useGameOfLife = (
  columns: Ref<number> | number,
  rows: Ref<number> | number
) => {
  const columnCount = ref(columns)
  const rowCount = ref(rows)

  const board = ref<boolean[][] | null>(null)
  watchEffect(() => {
    board.value = generateBoard(columnCount.value, rowCount.value)
  })

  let lastBoard: boolean[][] | undefined
  const updateBoard = (): boolean => {
    if (board.value) {
      const nextBoard = getNextState(board.value)
      if (areEqual(board.value, nextBoard) || areEqual(lastBoard, nextBoard))
        return false // Since the board is repeating with period of 2, stop the loop.
      lastBoard = board.value
      board.value = nextBoard
    }
    return true
  }
  const updateLoop = () =>
    setTimeout(() => {
      const isUpdated = updateBoard()
      if (isUpdated) updateLoop()
    }, 500)

  return {
    board,
    updateLoop,
  }
}
