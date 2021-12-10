import { mount } from '@vue/test-utils'
import SnakeCanvas from './SnakeCanvas.vue'
import { getNextState } from '../modules/snakeModule'

const mockAnimation = {
  start: jest.fn(),
  stop: jest.fn()
}
jest.mock('../modules/animationModule', () => ({
  createAnimation: (fn: Function) => {
    fn()
    return mockAnimation
  }
}))

jest.mock('../modules/snakeModule', () => ({
  getNextState: jest.fn().mockReturnValue({ snake: [] })
}))

describe('Snake Canvas Specs', () => {
  let wrapper: any

  const ctx = { fillRect: jest.fn() } as unknown as CanvasRenderingContext2D | null

  Object.defineProperties(HTMLCanvasElement.prototype, {
    height: { value: 100, writable: true },
    width: { value: 100, writable: true },
    getContext: { value: jest.fn().mockReturnValue(ctx) }
  })

  beforeEach(() => {
    jest.useFakeTimers()
    wrapper = mount(SnakeCanvas)
    jest.runAllTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
    wrapper.unmount()
  })

  it('renders a canvas', () => {
    expect(wrapper.find('[data-test="snake-canvas"]').exists()).toBe(true)
  })

  it('starts the game', () => {
    expect(mockAnimation.start).toHaveBeenCalled()
  })

  it('stops the game', () => {
    wrapper.unmount()
    expect(mockAnimation.stop).toHaveBeenCalled()
  })

  it('draws a snake', () => {
    ;(getNextState as jest.Mock).mockReturnValue({
      snake: [
        { x: 1, y: 1 },
        { x: 2, y: 1 }
      ]
    })

    wrapper = mount(SnakeCanvas)
    jest.runAllTimers()

    expect(ctx?.fillRect).toBeCalledWith(1, 1, 1, 1)
    expect(ctx?.fillRect).toBeCalledWith(2, 1, 1, 1)
  })

  it.todo('draws an apple')
  it.todo('clears the canvas when the snake eats itself')
  it.todo('clears the canvas when the snake collides with the walls')
  it.todo('moves the snake upwards, downwards, left and right')
})
