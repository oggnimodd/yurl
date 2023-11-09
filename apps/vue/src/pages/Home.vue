<script setup lang="ts">
import { CommonLayout } from "@/layouts";
import { Hero } from "@/components";
</script>

<template>
  <CommonLayout :require-auth="false">
    <Hero />
  </CommonLayout>
</template>
