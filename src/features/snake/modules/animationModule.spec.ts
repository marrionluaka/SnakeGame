import { once } from 'ramda'
import { createAnimation } from './animationModule'

describe('Animations specs', () => {
  const cancelAnimationFrameSpy = jest.fn()

  beforeEach(() => {
    window.requestAnimationFrame = jest.fn().mockImplementation(
      once(cb => {
        cb(201)
        return 201
      })
    )
    window.cancelAnimationFrame = cancelAnimationFrameSpy
  })

  it('starts an animation', () => {
    const fn = jest.fn()
    const animation = createAnimation(fn)

    animation.start()

    expect(fn).toHaveBeenCalled()
  })

  it('stops an animation', () => {
    const animation = createAnimation(jest.fn())
    animation.start()

    animation.stop()

    expect(cancelAnimationFrameSpy).toHaveBeenCalledWith(201)
  })
})
