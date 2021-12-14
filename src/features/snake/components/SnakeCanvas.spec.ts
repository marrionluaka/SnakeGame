import { mount } from '@vue/test-utils'
import SnakeCanvas from './SnakeCanvas.vue'

const mockAnimation = {
  start: jest.fn(),
  stop: jest.fn()
}
jest.mock('../modules/animationModule', () => ({
  createAnimation: jest.fn().mockImplementation(fn => {
    fn()
    return mockAnimation
  })
}))

describe.skip('Snake Canvas Specs', () => {
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

  it.todo('draws an apple')

  it.todo('draws a snake')

  it.todo('moves the snake upwards, downwards, left and right')

  it.todo('draws a snake eating an apple')

  it.todo('stops the game when the snake eats itself')

  it.todo('stops the game when the snake collides with the walls')
})
