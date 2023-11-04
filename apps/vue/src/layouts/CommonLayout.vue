<script setup lang="ts">
import { Header } from "@/components"
import { onMounted } from "vue";
import { watch } from "vue";
import { useAuth, useClerk } from "vue-clerk";
import { useRoute, useRouter } from "vue-router";

interface Props {
  requireAuth?: boolean
}
const { redirectToSignIn } = useClerk()
const { isLoaded, isSignedIn } = useAuth()

const { path } = useRoute()
const router = useRouter()

const { requireAuth } = withDefaults(defineProps<Props>(), {
  requireAuth: true
})

const checkAuth = async () => {
  if (isLoaded.value && requireAuth && !isSignedIn.value) {
    await router.push("/")
    await redirectToSignIn({
      redirectUrl: path
    })
  }
}

watch(isLoaded, async () => {
  await checkAuth()
})

watch(isSignedIn, async (newValue, oldValue) => {
  if (oldValue && !newValue) {
    await router.push("/")
  }
})

onMounted(async () => {
  await checkAuth()
})

</script>


<template>
  <div>
    <Header />
    <div class="container max-w-4xl mx-auto">
      <div v-if="requireAuth && !isLoaded">Loading...</div>
      <slot v-else-if="!requireAuth || (isLoaded && isSignedIn)">
        Fallback layout
      </slot>
    </div>
  </div>
</template>