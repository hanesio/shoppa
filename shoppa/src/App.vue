<template>
  <header class="sticky top-0 right-0 left-0 z-10">
    <div class="flex items-center justify-between px-4">
      <nav>
        <RouterLink class="" to="/">Übersicht</RouterLink>
      </nav>
    </div>
  </header>
  <main class="px-6">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
