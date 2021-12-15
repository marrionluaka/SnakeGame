import { mount } from '@vue/test-utils'
import SnakeCanvas from './SnakeCanvas.vue'
import { range } from 'ramda'

const mockAnimation = {
  start: jest.fn(),
  stop: jest.fn()
}
let animationFn: any
jest.mock('../modules/animationModule', () => ({
  createAnimation: jest.fn().mockImplementation(fn => {
    animationFn = fn
    fn()
    return mockAnimation
  })
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
    jest.spyOn(Math, 'random').mockReturnValue(0.3)
    jest.useFakeTimers()

    wrapper = mount(SnakeCanvas)
    jest.runAllTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.clearAllMocks()
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

  it('draws an apple', () => {
    expect(ctx?.fillRect).toBeCalledWith(80, 14, 5, 7)
  })

  it('draws a snake', () => {
    expect(ctx?.fillRect).toBeCalledWith(10, 14, 5, 7)
  })

  it.each`
    direction      | event             | expected
    ${'upwards'}   | ${'keydown.up'}   | ${[15, 7, 5, 7]}
    ${'downwards'} | ${'keydown.down'} | ${[15, 21, 5, 7]}
  `('moves the snake $direction', async ({ event, expected }) => {
    wrapper = mount(SnakeCanvas)
    jest.runAllTimers()

    await wrapper.trigger(event)
    range(0, 2).forEach(() => animationFn())
    jest.runAllTimers()

    expect(ctx?.fillRect).toBeCalledWith(...expected)
  })

  it('moves the snake to the left', async () => {
    wrapper = mount(SnakeCanvas)
    jest.runAllTimers()

    await wrapper.trigger('keydown.up')
    range(0, 2).forEach(() => animationFn())
    jest.runAllTimers()

    await wrapper.trigger('keydown.left')
    range(0, 2).forEach(() => animationFn())
    jest.runAllTimers()

    expect(ctx?.fillRect).toBeCalledWith(10, 0, 5, 7)
  })

  it.todo('draws a snake eating an apple')

  it.todo('stops the game when the snake eats itself')

  it.todo('stops the game when the snake collides with the walls')
})
