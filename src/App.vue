<template lang="pug">
.flex.flex-col.h-screen
  header.relative.z-10.flex-none.py-3.pl-5.pr-3.flex.items-center.space-x-4(class="sm:pl-6 sm:pr-4 md:pr-3.5 lg:px-6")
    #nav.flex.flex-auto.items-center.min-w-0.space-x-5
      router-link(to="/") Home

  main.flex-grow.relative.border-t.border-gray-200(class="dark:border-gray-800")
    router-view
</template>
