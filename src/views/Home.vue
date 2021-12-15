<template lang="pug">
main.container.leading-normal.my-12.mx-auto.px-4
  .mb-24
    h1.mb-8.text-5xl Playground project
    p.mb-8.text-xl
      | A playground project using: Vue3, VueX, Tailwind, Typescript, Miragejs and much more.

  .flex.flex-wrap.my-8.-mx-1
    .my-1.px-1(v-for="route in routes" class="w-1/2 md:w-1/3 lg:w-1/4")
      a(v-if="route.link" :href="route.link" target="_blank")
        img.block.h-auto.w-full(:src="route.img_path" :alt="route.alt")
      router-link(v-else :to="route.route_params")
        img.block.h-auto.w-full(:src="route.img_path" :alt="route.alt")
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
