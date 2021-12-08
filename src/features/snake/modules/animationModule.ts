type CreateAnimationFn = (fn: Function) => { start: () => void; stop: () => void }
const createAnimation: CreateAnimationFn = fn => {
  let animationRef: number

  const innerFn = (timestamp: number) => {
    fn(timestamp)
    animationRef = requestAnimationFrame(innerFn)
  }

  return {
    start: () => {
      animationRef = requestAnimationFrame(innerFn)
    },

    stop: () => {
      cancelAnimationFrame(animationRef)
    }
  }
}

export { createAnimation }
