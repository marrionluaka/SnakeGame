import { getNextState, GameState } from './snakeModule'

describe('snakeModule specs', () => {
  it("returns the apple's current location", () => {
    const nextState = getNextState({
      snake: [],
      apple: { x: 12, y: 4 }
    } as unknown as GameState)

    expect(nextState).toEqual(nextState)
  })

  it('returns a new apple at a random location', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.3)

    const nextState = getNextState({
      cols: 20,
      rows: 14,
      snake: [{ x: 12, y: 4 }],
      moves: [{ x: 1, y: 0 }],
      apple: { x: 13, y: 4 }
    } as unknown as GameState)

    expect(nextState).toEqual({ ...nextState, apple: { x: 5, y: 3 } })
  })
})
