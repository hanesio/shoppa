<template>
  <header>
    <div class="flex items-center justify-between bg-gray-800 p-4 text-white">
      <nav>
        <RouterLink class="" to="/">Übersicht</RouterLink>
      </nav>
    </div>
  </header>
  <main class="px-6 py-4">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
