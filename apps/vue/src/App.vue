<script setup lang="ts">
import Toast from "primevue/toast";
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
</script>

<template>
  <VueQueryDevtools />
  <Toast position="bottom-right" :auto-z-index="true" />
  <router-view></router-view>
</template>
