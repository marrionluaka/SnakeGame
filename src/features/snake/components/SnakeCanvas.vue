<template lang="pug">
canvas(ref="canvas" data-test="snake-canvas")
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref, Ref, watchEffect } from 'vue'

export default defineComponent({
  name: 'SnakeCanvas',

  setup() {
    const canvas: Ref<HTMLCanvasElement | null> = ref(null)

    watchEffect(() => {
      if (canvas.value) {
        _draw(canvas.value, canvas.value.getContext('2d'))
      }
    })

    onUnmounted(() => {})

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
