<script setup lang="ts">
import Button from 'primevue/button';

export interface Props {
  label: string
  disabled?: boolean
}

const { label } = withDefaults(defineProps<Props>(), {
  disabled: false
})

</script>

<template>
  <Button :disabled="disabled">{{ label }}</Button>
</template>
