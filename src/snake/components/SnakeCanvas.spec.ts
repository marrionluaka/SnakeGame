import { range } from 'ramda'
import { mount, config } from '@vue/test-utils'

import SnakeCanvas from './SnakeCanvas.vue'
import * as snakeModule from '../modules/snakeModule'
import { DIRECTION } from '../modules/snakeModule'

config.global.config.warnHandler = () => {}

const mockAnimation = {
  start: jest.fn(),
  stop: jest.fn(),
  increaseSpeed: jest.fn()
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
    height: { value: 100, writable: false },
    width: { value: 100, writable: false },
    getContext: { value: jest.fn().mockReturnValue(ctx) }
  })

  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.3)
    wrapper = mount(SnakeCanvas)
  })

  afterEach(() => {
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

  it('draws an bait', () => {
    expect(ctx?.fillRect).toBeCalledWith(80, 14, 5, 7)
  })

  it('draws a snake', () => {
    expect(ctx?.fillRect).toBeCalledWith(10, 14, 5, 7)
  })

  describe('snake movement specs', () => {
    it.each`
      direction      | key            | expected
      ${'downwards'} | ${'ArrowDown'} | ${[15, 21, 5, 7]}
      ${'upwards'}   | ${'ArrowUp'}   | ${[15, 7, 5, 7]}
    `('moves the snake $direction', ({ key, expected }) => {
      wrapper = mount(SnakeCanvas)

      window.dispatchEvent(new KeyboardEvent('keydown', { key }))
      range(0, 2).forEach(() => animationFn())

      expect(ctx?.fillRect).toBeCalledWith(...expected)
    })

    it('moves the snake to the left', () => {
      wrapper = mount(SnakeCanvas)

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))
      range(0, 2).forEach(() => animationFn())

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))
      range(0, 2).forEach(() => animationFn())

      expect(ctx?.fillRect).toBeCalledWith(10, 0, 5, 7)
    })
  })

  it('stops the game when the snake eats itself or collides with the walls', () => {
    range(0, 18).forEach(() => animationFn())
    expect((ctx?.fillRect as jest.Mock).mock.calls.pop()).toEqual([0, 0, 100, 100])
  })

  it.each`
    baitEaten | expected
    ${3}      | ${200}
    ${7}      | ${100}
    ${12}     | ${50}
    ${20}     | ${25}
  `('increases the game speed based on the amount of bait eaten', async ({ baitEaten, expected }) => {
    jest.spyOn(snakeModule, 'getNextState').mockReturnValue({
      baitEaten,
      cols: 20,
      rows: 14,
      snake: [{ x: 2, y: 2 }],
      moves: [DIRECTION.RIGHT],
      bait: { x: 0, y: 0 }
    } as snakeModule.GameState)

    wrapper = mount(SnakeCanvas)
    await wrapper.vm.$nextTick()

    expect(mockAnimation.increaseSpeed).toBeCalledWith(expected)
  })

  it('displays the amount of bait eaten', async () => {
    jest.spyOn(snakeModule, 'getNextState').mockReturnValue({
      baitEaten: 5,
      cols: 20,
      rows: 14,
      snake: [{ x: 2, y: 2 }],
      moves: [DIRECTION.RIGHT],
      bait: { x: 0, y: 0 }
    } as snakeModule.GameState)

    wrapper = mount(SnakeCanvas)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test="snake-score"]').text()).toContain('5')
  })

  it('pauses the game', async () => {
    await wrapper.find('[data-test="snake-pause"]').trigger('click')
    expect(mockAnimation.stop).toBeCalled()
  })

  it('unpauses the game', async () => {
    await wrapper.find('[data-test="snake-unpause"]').trigger('click')
    expect(mockAnimation.start).toBeCalled()
  })
})
