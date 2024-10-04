<script setup>
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

// Fetch user data on app load
//authStore.fetchUser()
</script>
<style></style>

<template>
  <div class="min-h-screen">
    <div class="!sticky top-0 z-10">
      <Header />
      <slot />
      <Footer />
    </div>
  </div>
</template>
