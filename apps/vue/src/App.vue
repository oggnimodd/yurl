<script setup lang="ts">
import { HelloWorld, Data } from "./components";
import ProgressSpinner from "primevue/progressspinner";
import { useAuth } from "vue-clerk";

const { isLoaded } = useAuth();

</script>

<template>
  <div>

    <div v-if="!isLoaded">
      <ProgressSpinner stroke-width="4" />
    </div>

    <HelloWorld />
    <Data />
  </div>
</template>

