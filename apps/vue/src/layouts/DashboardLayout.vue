<script setup lang="ts">
import Button from "primevue/button";
import CommonLayout from "./CommonLayout.vue";
</script>

<template>
  <CommonLayout :require-auth="true">
    <div class="border-b-2 border-gray-8 mt-1">
      <div class="w-full flex items-center justify-between">
        <h2 class="text-2xl">Dashboard</h2>
        <router-link to="/new">
          <Button size="small" icon="pi pi-plus" label="Create new link" />
        </router-link>
      </div>
    </div>
    <slot></slot>
  </CommonLayout>
</template>
