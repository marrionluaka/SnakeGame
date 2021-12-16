import { getNextState, enqueueDirection, DIRECTION, GameState } from './snakeModule'

describe('snakeModule specs', () => {
  jest.spyOn(Math, 'random').mockReturnValue(0.3)

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
    const nextState = getNextState({
      ...initialState,
      snake: [{ x: 12, y: 4 }],
      apple: { x: 13, y: 4 }
    } as unknown as GameState)

    expect(nextState.apple).toEqual({ x: 5, y: 3 })
  })

  it('returns the latest direction command', () => {
    const nextState = getNextState({ ...initialState, moves: [DIRECTION.RIGHT, DIRECTION.UP] } as unknown as GameState)
    expect(nextState.moves).toEqual([DIRECTION.UP])
  })

  it('moves the snake towards a given direction', () => {
    const nextState = enqueueDirection(initialState as unknown as GameState, DIRECTION.DOWN)
    expect(nextState.moves).toEqual([DIRECTION.RIGHT, DIRECTION.DOWN])
  })

  it('prevents the snake from going the opposite direction it is currently moving in', () => {
    const nextState = enqueueDirection(initialState as unknown as GameState, DIRECTION.LEFT)
    expect(nextState.moves).toEqual([DIRECTION.RIGHT])
  })

  it('returns the current state of the snake when it is not eating', () => {
    const nextState = getNextState({ ...initialState, snake: [{ x: 14, y: 7 }] } as unknown as GameState)
    expect(nextState.snake).toEqual([{ x: 15, y: 7 }])
  })

  it('returns the next state of the snake when it is about to eat (expands the snake)', () => {
    const snakeHead = { x: 15, y: 7 }

    const nextState = getNextState({ ...initialState, snake: [{ x: 14, y: 7 }], apple: snakeHead } as unknown as GameState)

    expect(nextState.snake).toEqual([snakeHead, { x: 14, y: 7 }])
  })

  it('returns an empty snake state when it eats itself', () => {
    const nextState = getNextState({
      ...initialState,
      snake: [
        { x: 11, y: 8 },
        { x: 12, y: 8 },
        { x: 12, y: 9 },
        { x: 11, y: 9 },
        { x: 10, y: 9 }
      ],
      moves: [DIRECTION.DOWN]
    } as unknown as GameState)

    expect(nextState.snake.length).toBe(0)
  })

  it('returns an empty state when it crashes against the wall', () => {
    const stateXPos = getNextState({ ...initialState, snake: [{ x: 19, y: 8 }] } as unknown as GameState)
    expect(stateXPos.snake.length).toBe(0)

    const stateXNeg = getNextState({ ...initialState, snake: [{ x: 0, y: 8 }], moves: [DIRECTION.LEFT] } as unknown as GameState)
    expect(stateXNeg.snake.length).toBe(0)

    const stateYPos = getNextState({ ...initialState, snake: [{ x: 10, y: 13 }], moves: [DIRECTION.DOWN] } as unknown as GameState)
    expect(stateYPos.snake.length).toBe(0)

    const stateYNeg = getNextState({ ...initialState, snake: [{ x: 10, y: 0 }], moves: [DIRECTION.UP] } as unknown as GameState)
    expect(stateYNeg.snake.length).toBe(0)
  })

  it('tracks the amount of bait eaten', () => {
    const nextState = getNextState({
      ...initialState,
      baitEaten: 0,
      snake: [{ x: 14, y: 7 }],
      apple: { x: 15, y: 7 }
    } as unknown as GameState)

    expect(nextState.baitEaten).toBe(1)
  })
})
