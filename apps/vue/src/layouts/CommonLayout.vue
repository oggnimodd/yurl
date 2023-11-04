<script setup lang="ts">
import { Header } from "@/components"

</script>


<template>
  <div>
    <Header />
    <div class="container max-w-4xl mx-auto">
      <slot>
        Fallback layout
      </slot>
    </div>
  </div>
</template>