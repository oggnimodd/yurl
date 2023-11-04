<script setup lang="ts">
import Button from "primevue/button"
import { CommonLayout } from "@/layouts"
</script>

<template>
  <CommonLayout>
    <p>
      This is the homepage
    </p>

    <router-link to="/new">
      <Button size="small">Create new Link</Button>
    </router-link>
  </CommonLayout>
</template>