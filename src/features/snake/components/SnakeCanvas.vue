<template lang="pug">
canvas(ref="canvas" data-test="snake-canvas" @keydown="onKeydown")
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, Ref } from 'vue'
import { createAnimation } from '../modules/animationModule'
import { DIRECTION, enqueueDirection, GameState, getNextState } from '../modules/snakeModule'

enum KeyEvent {
  UP = 'up',
  RIGHT = 'right',
  DOWN = 'down',
  LEFT = 'left'
}

export default defineComponent({
  name: 'SnakeCanvas',

  setup() {
    const gameState: Ref<GameState> = ref({
      cols: 20,
      rows: 14,
      moves: [DIRECTION.RIGHT],
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

    const onKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case KeyEvent.UP:
          gameState.value = enqueueDirection(gameState.value, DIRECTION.UP)
          break
        case KeyEvent.RIGHT:
          gameState.value = enqueueDirection(gameState.value, DIRECTION.RIGHT)
          break
        case KeyEvent.DOWN:
          gameState.value = enqueueDirection(gameState.value, DIRECTION.DOWN)
          break
        case KeyEvent.LEFT:
          gameState.value = enqueueDirection(gameState.value, DIRECTION.LEFT)
          break
      }
    }

    onMounted(() => {
      gameLoop.start()
    })

    onUnmounted(() => {
      gameLoop.stop()
    })

    const normalizeX = (x: number): number => Math.round((x * (canvas.value as HTMLCanvasElement).width) / gameState.value.cols)
    const normalizeY = (y: number): number => Math.round((y * (canvas.value as HTMLCanvasElement).width) / gameState.value.rows)

    const _draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null): void => {
      _clearCanvas(canvas, ctx)
      _drawSnake(ctx, gameState.value)
      _drawApple(ctx, gameState.value)
    }

    const _clearCanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null): void => {
      ctx?.fillRect(0, 0, canvas.width, canvas.height)
    }

    const _drawSnake = (ctx: CanvasRenderingContext2D | null, state: GameState): void => {
      state.snake.forEach(p => ctx?.fillRect(normalizeX(p.x), normalizeY(p.y), normalizeX(1), normalizeY(1)))
    }

    const _drawApple = (ctx: CanvasRenderingContext2D | null, state: GameState): void => {
      ctx?.fillRect(normalizeX(state.apple.x), normalizeY(state.apple.y), normalizeX(1), normalizeY(1))
    }

    return { canvas, onKeydown }
  }
})
</script>
