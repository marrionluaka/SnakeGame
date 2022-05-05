<template lang="pug">
div
  .flex.justify-between.items-center
    button.rounded-lg.p-4.bg-green-700.mb-4(data-test="snake-pause" @click="gameStart") Start
    div(data-test="snake-score") Score: {{ score }}
    button.rounded-lg.p-4.bg-red-700.mb-4(data-test="snake-unpause" @click="gameStop") Stop
  canvas(ref="canvas" width="700" height="500" data-test="snake-canvas")
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, watch, ref, Ref, ComputedRef, computed } from 'vue'
import { createAnimation, Animation } from '../modules/animationModule'
import { DIRECTION, enqueueDirection, GameState, getNextState } from '../modules/snakeModule'

enum KeyEvent {
  UP = 'ArrowUp',
  RIGHT = 'ArrowRight',
  DOWN = 'ArrowDown',
  LEFT = 'ArrowLeft'
}

export default defineComponent({
  name: 'SnakeCanvas',

  setup() {
    const initialGameState = {
      cols: 20,
      rows: 14,
      baitEaten: 0,
      snake: [],
      moves: [DIRECTION.RIGHT],
      bait: { x: 16, y: 2 }
    }
    const gameState: Ref<GameState> = ref(initialGameState)
    const canvas: Ref<HTMLCanvasElement | null> = ref(null)
    const score: ComputedRef<number> = computed(() => gameState.value.baitEaten)

    let animation: Animation

    onMounted(() => {
      window.addEventListener('keydown', _onKeydown)
      animation = createAnimation(_gameLoop)
      animation.start()
    })

    onUnmounted(() => {
      animation.stop()
    })

    watch(
      () => gameState.value.baitEaten,
      (baitEaten: number) => animation.increaseSpeed(_getAnimationSpeed(baitEaten)),
      { deep: true }
    )

    function _gameLoop() {
      gameState.value = getNextState(gameState.value)
      _draw(canvas.value as HTMLCanvasElement, canvas.value?.getContext('2d') as CanvasRenderingContext2D)
    }

    function _onKeydown(e: KeyboardEvent) {
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

    function _draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null): void {
      ctx && (ctx.fillStyle = '#232323')
      _clearCanvas(canvas, ctx)

      ctx && (ctx.fillStyle = '#B4D5AC')
      _drawSnake(ctx, gameState.value)

      ctx && (ctx.fillStyle = '#836953')
      _drawBait(ctx, gameState.value)
      _resetGame(canvas, ctx)
    }

    function _clearCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null): void {
      ctx?.fillRect(0, 0, canvas.width, canvas.height)
    }

    function _drawSnake(ctx: CanvasRenderingContext2D | null, state: GameState): void {
      state.snake.forEach(p => ctx?.fillRect(_normalizeX(p.x), _normalizeY(p.y), _normalizeX(1), _normalizeY(1)))
    }

    function _drawBait(ctx: CanvasRenderingContext2D | null, state: GameState): void {
      ctx?.fillRect(_normalizeX(state.bait.x), _normalizeY(state.bait.y), _normalizeX(1), _normalizeY(1))
    }

    function _resetGame(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null): void {
      if (gameState.value.snake.length) return

      ctx && (ctx.fillStyle = 'rgba(185, 28, 28, 1)')
      _clearCanvas(canvas, ctx)
      gameState.value = initialGameState
    }

    function _normalizeX(x: number): number {
      return Math.round((x * (canvas.value as HTMLCanvasElement).width) / gameState.value.cols)
    }

    function _normalizeY(y: number): number {
      return Math.round((y * (canvas.value as HTMLCanvasElement).height) / gameState.value.rows)
    }

    function _getAnimationSpeed(baitEaten: number): number {
      if (baitEaten > 0 && baitEaten <= 5) {
        return 200
      } else if (baitEaten > 5 && baitEaten <= 10) {
        return 100
      } else if (baitEaten > 10 && baitEaten <= 15) {
        return 50
      } else if (baitEaten > 15) {
        return 25
      } else {
        return 200
      }
    }

    return {
      score,
      canvas,
      gameStart: () => animation.start(),
      gameStop: () => animation.stop()
    }
  }
})
</script>

<style></style>
