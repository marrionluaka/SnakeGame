import { applySpec, curry, drop, dropLast, equals, mathMod, prop } from 'ramda'

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

const _random = curry((min: number, max: number): number => Math.floor(Math.random() * max) + min)

const _willEat = (state: GameState): boolean => equals(_getNextHead(state), state.apple)

const _willCrash = (state: GameState): boolean => state.snake.some(equals(_getNextHead(state)))

const _isValidMove = (move: Point, state: GameState): boolean => state.moves[0].x + move.x != 0 || state.moves[0].y + move.y != 0

const _getNextApple = (state: GameState): Point => (_willEat(state) ? _getNextApplePosition(state) : state.apple)

const _getNextMoves = (state: GameState): Point[] => (state.moves.length > 1 ? drop(1, state.moves) : state.moves)

const _getNextSnake = (state: GameState): Point[] =>
  _willCrash(state)
    ? []
    : _willEat(state)
    ? [_getNextHead(state)].concat(state.snake)
    : [_getNextHead(state)].concat(dropLast(1, state.snake))

const _getNextHead = (state: GameState): Point =>
  !state.snake.length
    ? { x: 2, y: 2 }
    : { x: mathMod(state.snake[0].x + state.moves[0].x, state.cols), y: mathMod(state.snake[0].y + state.moves[0].y, state.rows) }

const _getNextApplePosition = (grid: Grid): Point => ({ x: _random(0, grid.cols - 1), y: _random(0, grid.rows - 1) })

const getNextState: (gameState: GameState) => GameState = applySpec({
  cols: prop('cols'),
  rows: prop('rows'),
  moves: _getNextMoves,
  snake: _getNextSnake,
  apple: _getNextApple
})

const enqueueDirection = (state: GameState, move: Point): GameState =>
  _isValidMove(move, state) ? { ...state, moves: state.moves.concat([move]) } : state

export { getNextState, enqueueDirection }
