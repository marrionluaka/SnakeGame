import { applySpec, curry, drop, equals, mathMod, merge, prop } from 'ramda'

type Point = {
  x: number
  y: number
}

type Grid = {
  cols: number
  rows: number
}

export interface GameState extends Grid {
  snake: Point[]
  apple: Point
  moves: Point[]
}

export const DIRECTION = Object.freeze({
  UP: { x: 0, y: -1 },
  LEFT: { x: -1, y: 0 },
  DOWN: { x: 0, y: 1 },
  RIGHT: { x: 1, y: 0 }
})

const _random = curry((min, max) => Math.floor(Math.random() * max) + min)

const _willEat: (state: GameState) => boolean = state => equals(_getNextHead(state), state.apple)

const _isValidMove: (move: Point, state: GameState) => boolean = (move, state) => {
  return state.moves[0].x + move.x != 0 || state.moves[0].y + move.y != 0
}

const _getNextApple: (state: GameState) => Point = state => (_willEat(state) ? _getNextApplePosition(state) : state.apple)

const _getNextMoves: (state: GameState) => Point[] = state => (state.moves.length > 1 ? drop(1, state.moves) : state.moves)

const _getNextHead: (state: GameState) => Point = state =>
  !state.snake.length
    ? { x: 2, y: 2 }
    : { x: mathMod(state.snake[0].x + state.moves[0].x, state.cols), y: mathMod(state.snake[0].y + state.moves[0].y, state.rows) }

const _getNextApplePosition: (grid: Grid) => Point = grid => ({ x: _random(0, grid.cols - 1), y: _random(0, grid.rows - 1) })

const getNextState: (gameState: GameState) => GameState = applySpec({
  cols: prop('cols'),
  rows: prop('rows'),
  moves: _getNextMoves,
  snake: prop('snake'),
  apple: _getNextApple
})

const enqueueDirection: (state: GameState, move: Point) => GameState = (state, move) => {
  return _isValidMove(move, state) ? merge(state, { moves: state.moves.concat([move]) }) : state
}

export { getNextState, enqueueDirection }
