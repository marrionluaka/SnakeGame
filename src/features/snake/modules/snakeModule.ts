import { applySpec, curry, equals, mathMod, prop } from 'ramda'

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

const _random = curry((min, max) => Math.floor(Math.random() * max) + min)

const _willEat: (state: GameState) => boolean = state => equals(_getNextHead(state), state.apple)

const _getNextApple: (state: GameState) => Point = state => (_willEat(state) ? _getNextApplePosition(state) : state.apple)

const _getNextHead: (state: GameState) => Point = state =>
  !state.snake.length
    ? { x: 2, y: 2 }
    : { x: mathMod(state.snake[0].x + state.moves[0].x, state.cols), y: mathMod(state.snake[0].y + state.moves[0].y, state.rows) }

const _getNextApplePosition: (grid: Grid) => Point = grid => ({ x: _random(0, grid.cols - 1), y: _random(0, grid.rows - 1) })

const getNextState: (gameState: GameState) => GameState = applySpec({
  cols: prop('cols'),
  rows: prop('rows'),
  moves: prop('moves'),
  snake: prop('snake'),
  apple: _getNextApple
})

export { getNextState }
