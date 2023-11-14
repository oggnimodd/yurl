<script setup lang="ts">
import { ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import ProgressSpinner from "primevue/progressspinner";
import { api } from "@/trpc";
import { Card } from "@/components";
import Fuse from "fuse.js";
import { useDebounce } from "@vueuse/core";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

const filter = ref("");
const searchLinks = useDebounce(filter, 200);

const {
  data: linksData,
  isLoading,
  error,
} = useQuery({
  queryKey: ["allLinks", { filter: filter.value }],
  queryFn: () => api.link.allLinks.query({ filter: filter.value }),
});

const options = {
  keys: ["slug", "url"],
  includeScore: true,
};

const fuse = computed(() => new Fuse(linksData.value || [], options));
const result = computed(() => fuse.value.search(searchLinks.value));
const filteredLinks = computed(() => result.value.map(({ item }) => item));

const showError = computed(() => error.value !== null);
const showLoader = computed(() => isLoading.value && !showError.value);
const showNoLinks = computed(
  () => !isLoading.value && linksData.value?.length === 0,
);
const showLinks = computed(
  () => (!isLoading.value && linksData.value?.length) ?? 0,
);

const showNoResults = computed(
  () =>
    searchLinks.value &&
    filter.value &&
    !isLoading.value &&
    filteredLinks.value.length === 0,
);
</script>

<template>
  <div>
    <div v-if="showError" class="flex flex-col items-center py-5 gap-3">
      <i class="pi pi-exclamation-triangle text-red-500 text-6xl"></i>
      <p class="text-center">
        {{ error?.message }}
      </p>
    </div>

    <div v-if="showLoader" class="flex flex-col items-center py-5">
      <ProgressSpinner class="w-16 h-16" />
      <p>Loading...</p>
    </div>

    <span class="p-input-icon-left max-w-sm mx-auto mt-2 mb-6">
      <i class="pi pi-search"></i>
      <InputText v-model="filter" placeholder="Search links" />
    </span>

    <div
      v-if="showNoLinks"
      class="flex flex-col items-center justify-center py-10"
    >
      <i class="pi pi-rocket text-6xl"></i>
      <p class="mb-4 text-lg">Lets create your first link!</p>
      <router-link to="/new">
        <Button size="small" icon="pi pi-plus"> Create a link </Button>
      </router-link>
    </div>

    <div
      v-if="showNoResults"
      class="flex flex-col items-center justify-center py-3"
    >
      <p class="mb-4 text-lg">No results found!</p>
    </div>

    <div
      v-if="showLinks"
      class="pb-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      <Card
        v-for="link in searchLinks ? filteredLinks : linksData"
        :key="link.id"
        :id="link.id"
        :url="link.url"
        :description="link.description || ''"
        :slug="link.slug"
      />
    </div>
  </div>
</template>
