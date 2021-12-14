import { getNextState, DIRECTION, GameState } from './snakeModule'

describe('snakeModule specs', () => {
  const initialState = {
    cols: 20,
    rows: 14,
    snake: [],
    moves: [DIRECTION.RIGHT],
    apple: {}
  }

  it("returns the apple's current location", () => {
    const nextState = getNextState({ ...initialState, apple: { x: 12, y: 4 } } as unknown as GameState)
    expect(nextState).toEqual(nextState)
  })

  it('returns a new apple at a random location', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.3)

    const nextState = getNextState({
      ...initialState,
      snake: [{ x: 12, y: 4 }],
      apple: { x: 13, y: 4 }
    } as unknown as GameState)

    expect(nextState).toEqual({ ...nextState, apple: { x: 5, y: 3 } })
  })

  it('returns the latest direction command', () => {
    const nextState = getNextState({ ...initialState, moves: [DIRECTION.RIGHT, DIRECTION.UP] } as unknown as GameState)
    expect(nextState).toEqual({ ...initialState, moves: [DIRECTION.UP] })
  })
})
