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
    const initialGameState = {
      cols: 20,
      rows: 14,
      moves: [DIRECTION.RIGHT],
      snake: [],
      apple: { x: 16, y: 2 }
    }
    const gameState: Ref<GameState> = ref(initialGameState)
    const canvas: Ref<HTMLCanvasElement | null> = ref(null)

    const gameLoop = createAnimation(() =>
      setTimeout(() => {
        gameState.value = getNextState(gameState.value)
        _draw(canvas.value as HTMLCanvasElement, canvas.value?.getContext('2d') as CanvasRenderingContext2D)
      }, 1000 / 24)
    )

    const onKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'w':
        case 'h':
        case KeyEvent.UP:
          gameState.value = enqueueDirection(gameState.value, DIRECTION.UP)
          break
        case 'd':
        case 'l':
        case KeyEvent.RIGHT:
          gameState.value = enqueueDirection(gameState.value, DIRECTION.RIGHT)
          break
        case 's':
        case 'k':
        case KeyEvent.DOWN:
          gameState.value = enqueueDirection(gameState.value, DIRECTION.DOWN)
          break
        case 'a':
        case 'j':
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

    const _draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null): void => {
      _clearCanvas(canvas, ctx)
      _drawSnake(ctx, gameState.value)
      _drawApple(ctx, gameState.value)
      _resetGame(canvas, ctx)
    }

    const _clearCanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null): void => {
      ctx?.fillRect(0, 0, canvas.width, canvas.height)
    }

    const _drawSnake = (ctx: CanvasRenderingContext2D | null, state: GameState): void => {
      state.snake.forEach(p => ctx?.fillRect(_normalizeX(p.x), _normalizeY(p.y), _normalizeX(1), _normalizeY(1)))
    }

    const _drawApple = (ctx: CanvasRenderingContext2D | null, state: GameState): void => {
      ctx?.fillRect(_normalizeX(state.apple.x), _normalizeY(state.apple.y), _normalizeX(1), _normalizeY(1))
    }

    const _resetGame = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null): void => {
      if (gameState.value.snake.length) return

      _clearCanvas(canvas, ctx)
      gameState.value = initialGameState
    }

    const _normalizeX = (x: number): number => {
      return Math.round((x * (canvas.value as HTMLCanvasElement).width) / gameState.value.cols)
    }

    const _normalizeY = (y: number): number => {
      return Math.round((y * (canvas.value as HTMLCanvasElement).width) / gameState.value.rows)
    }

    return { canvas, onKeydown }
  }
})
</script>
