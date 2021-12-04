import { mount } from '@vue/test-utils'
import SnakeCanvas from './SnakeCanvas'

describe('Snake Canvas Specs', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(SnakeCanvas)
  })

  afterEach(() => wrapper.unmount())

  it.todo('renders a canvas')
  it.todo('clears the canvas')
  it.todo('starts the game')
  it.todo('stops the game')
  it.todo('draws a snake')
  it.todo('draws an apple')
  it.todo('clears the canvas when the snake eats itself')
  it.todo('clears the canvas when the snake collides with the walls')
  it.todo('moves the snake upwards, downwards, left and right')
})
