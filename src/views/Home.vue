<template lang="pug">
main.snake-game.flex.justify-center.items-center.text-white.h-full
  SnakeCanvas
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { SnakeCanvas } from '@/snake'

export default defineComponent({
  name: 'Snake',
  components: { SnakeCanvas }
})
</script>

<style lang="stylus" scoped>
.snake-game
  background: #121212
</style>
