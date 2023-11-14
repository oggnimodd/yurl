<script setup lang="ts">
import { defineProps } from "vue";
import { clsx } from "clsx";

export interface ActionIconProps {
  icon: string;
  onClick: () => void;
}

const { icon, onClick } = defineProps<ActionIconProps>();
</script>

<template>
  <button
    class="inline-flex items-center justify-center w-6 h-6 text-white bg-transparent rounded-md hover:bg-primary-600 !text-primary-500 hover:!text-white border-none outline-none cursor-pointer"
    @click="onClick"
  >
    <i :class="clsx(icon, 'text-sm')" />
  </button>
</template>
