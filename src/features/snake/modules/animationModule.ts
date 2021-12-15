import { curry } from 'ramda'

interface Animation {
  start: () => void
  stop: () => void
}

const createAnimation = (fn: Function): Animation => {
  let animationRef: number

  const innerFn = curry((previousTimestamp: number, timestamp: number) => {
    if (timestamp - previousTimestamp > 200) {
      fn()
      animationRef = requestAnimationFrame(innerFn(timestamp))
    } else {
      animationRef = requestAnimationFrame(innerFn(previousTimestamp))
    }
  })

  return {
    start: () => {
      animationRef = requestAnimationFrame(innerFn(0))
    },

    stop: () => {
      cancelAnimationFrame(animationRef)
    }
  }
}

export { createAnimation, Animation }
