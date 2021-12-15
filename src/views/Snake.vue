<template lang="pug">
main
  h1 Snake Game
  SnakeCanvas
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { SnakeCanvas } from '@/features/snake'

export default defineComponent({
  name: 'Snake',
  components: { SnakeCanvas }
})
</script>
