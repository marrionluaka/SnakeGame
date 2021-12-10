import { applySpec } from 'ramda'

interface Point {
  x: number
  y: number
}
export interface GameState {
  snake: Point[]
}

type GetNextStateFn = (gameState: GameState) => GameState
const getNextState: GetNextStateFn = applySpec({
  snake: []
})

export { getNextState }
