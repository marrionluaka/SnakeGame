<template lang="pug">
main.container.leading-normal.my-12.mx-auto.px-4.max-w-5xl
  .mb-12
    h1.text-5xl Browser Games

  .grid.grid-cols-2.gap-4
    div(v-for="route in routes")
      a(v-if="route.link" :href="route.link" target="_blank")
        img.block.h-auto.w-full.rounded-xl(:src="route.img_path" :alt="route.alt")
      router-link(v-else :to="route.route_params")
        img.block.h-auto.w-full.rounded-xl(:src="route.img_path" :alt="route.alt")
      h2.text-2xl.pt-2 {{ route.title }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import routes from '@/router/routes'

export default defineComponent({
  name: 'Home',

  setup() {
    return { routes }
  }
})
</script>
