<template lang="pug">
canvas(ref="canvas" data-test="snake-canvas")
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, Ref } from 'vue'
import { createAnimation } from '../modules/animationModule'
import { GameState, getNextState } from '../modules/snakeModule'

export default defineComponent({
  name: 'SnakeCanvas',

  setup() {
    const gameState: Ref<GameState> = ref({ snake: [] })
    const canvas: Ref<HTMLCanvasElement | null> = ref(null)

    const gameLoop = createAnimation(() =>
      setTimeout(() => {
        gameState.value = getNextState(gameState.value)
        _draw(canvas.value as HTMLCanvasElement, canvas.value?.getContext('2d') as CanvasRenderingContext2D)
      }, 1000 / 24)
    )

    onMounted(() => {
      gameLoop.start()
    })

    onUnmounted(() => {
      gameLoop.stop()
    })

    const _draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null): void => {
      _clearCanvas(canvas, ctx)
    }

    const _clearCanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null): void => {
      ctx?.fillRect(0, 0, canvas.width, canvas.height)
    }

    return { canvas }
  }
})
</script>
