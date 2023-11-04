<script setup lang="ts">
import { CommonLayout } from "@/layouts"
import Button from "primevue/button"
</script>

<template>
  <CommonLayout>
    <div class="flex flex-col items-center py-5">
      <span class="pi pi-exclamation-triangle text-6xl mx-auto text-primary-500"></span>
      <p class="text-lg font-medium">Opps, page not found</p>
      <router-link to="/">
        <Button size="small" class="inline-flex gap-x-3 items-center"><span class="pi pi-arrow-left"></span>Back to
          homepage</Button>
      </router-link>
    </div>
  </CommonLayout>
</template>