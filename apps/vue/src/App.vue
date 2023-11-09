<script setup lang="ts">
import Toast from "primevue/toast";
</script>

<template>
  <Toast position="bottom-right" :auto-z-index="true" />
  <router-view></router-view>
</template>
