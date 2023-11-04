<script setup lang="ts">
import AuthUserMenu from './AuthUserMenu.vue';

</script>


<template>
  <header class="w-full my-3">
    <div class="container max-w-4xl mx-auto flex items-center justify-between relative">
      <router-link to="/" class="text-3xl md:text-4xl font-bold no-underline text-primary-500">
        yurl
      </router-link>

      <div class="flex gap-x-3">
        <AuthUserMenu />
      </div>
    </div>
  </header>
</template>