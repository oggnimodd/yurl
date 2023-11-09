<script setup lang="ts">
import Button from "primevue/button";
import { REPO_URL } from "@/constants";

const handleSourceCode = () => {
  window.open(REPO_URL, "_blank");
};
</script>

<template>
  <div class="mt-32 xs:mt-20 items-center flex-col text-center">
    <h1 class="text-3xl xs:text-4xl md:text-5xl text-primary-500 mb-3">
      Super Cool Link Shortener
    </h1>
    <p class="mb-5 text-xl xs:text-2xl dark:text-white text-gray-7">
      Unlimited links &amp; custom slugs
    </p>
    <div class="flex flex-wrap gap-4 justify-center">
      <router-link to="/dashboard">
        <Button size="small" icon="pi pi-link" label="Get Started" />
      </router-link>
      <Button
        @click="handleSourceCode"
        size="small"
        icon="pi pi-github"
        label="Source Code"
      />
    </div>
  </div>
</template>
