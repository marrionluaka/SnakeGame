import { curry } from 'ramda'

interface Animation {
  start: () => void
  stop: () => void
  increaseSpeed: (animationSpeed: number) => void
}

const createAnimation = (fn: Function): Animation => {
  let _animationRef: number
  let _isAnimationRunning: boolean
  let _animationDuration: number = 200

  const innerFn = curry((previousTimestamp: number, timestamp: number) => {
    if (timestamp - previousTimestamp > _animationDuration) {
      fn()
      _animationRef = requestAnimationFrame(innerFn(timestamp))
    } else {
      _animationRef = requestAnimationFrame(innerFn(previousTimestamp))
    }
  })

  return {
    start: () => {
      if (_isAnimationRunning) return

      _animationRef = requestAnimationFrame(innerFn(0))
      _isAnimationRunning = true
    },

    stop: () => {
      cancelAnimationFrame(_animationRef)
      _animationDuration = 200
      _isAnimationRunning = false
    },

    increaseSpeed: (animationSpeed: number) => {
      _animationDuration = animationSpeed
    }
  }
}

export { createAnimation, Animation }
