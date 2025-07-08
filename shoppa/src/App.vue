<template>
  <header class="fixed top-0 left-0 z-20 w-full">
    <AuthButtons />
  </header>
  <main class="mt-18 px-2 lg:px-6">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AuthButtons from './components/AuthButtons.vue'
</script>
