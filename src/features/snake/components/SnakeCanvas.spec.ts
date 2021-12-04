import { once } from 'ramda'
import { mount } from '@vue/test-utils'
import SnakeCanvas from './SnakeCanvas.vue'

describe('Snake Canvas Specs', () => {
  let wrapper: any

  const ctx = { fillRect: jest.fn() } as unknown as CanvasRenderingContext2D | null

  Object.defineProperties(HTMLCanvasElement.prototype, {
    height: { value: 100, writable: true },
    width: { value: 100, writable: true },
    getContext: { value: jest.fn().mockReturnValue(ctx) }
  })

  window.requestAnimationFrame.prototype = jest.fn().mockImplementation(once(cb => cb(1)))

  beforeEach(() => {
    wrapper = mount(SnakeCanvas)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders a canvas', () => {
    expect(wrapper.find('[data-test="snake-canvas"]').exists()).toBe(true)
  })

  it('clears the canvas when the game starts', () => {
    expect(ctx?.fillRect).toBeCalledWith(0, 0, 100, 100)
  })

  it.todo('starts the game')
  it.todo('stops the game')
  it.todo('draws a snake')
  it.todo('draws an apple')
  it.todo('clears the canvas when the snake eats itself')
  it.todo('clears the canvas when the snake collides with the walls')
  it.todo('moves the snake upwards, downwards, left and right')
})
