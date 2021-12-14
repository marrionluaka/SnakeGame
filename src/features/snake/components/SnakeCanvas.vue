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
    const gameState: Ref<GameState> = ref({
      cols: 20,
      rows: 14,
      moves: [{ x: 1, y: 0 }],
      snake: [],
      apple: { x: 16, y: 2 }
    })
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
      _drawApple(ctx, gameState.value)
    }

    const _drawApple: (ctx: CanvasRenderingContext2D | null, state: GameState) => void = (ctx, state) => {
      ctx?.fillRect(state.apple.x, state.apple.y, 1, 1)
    }

    const _clearCanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null): void => {
      ctx?.fillRect(0, 0, canvas.width, canvas.height)
    }

    return { canvas }
  }
})
</script>
