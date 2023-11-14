<script setup lang="ts">
import { Ref, defineProps, withDefaults, ref } from "vue";
import Dialog from "primevue/dialog";
import Menu, { MenuProps } from "primevue/menu";
import { useToast } from "primevue/usetoast";
import { useClipboard } from "@vueuse/core";
import { useToggle } from "@vueuse/core";
import QrcodeVue from "qrcode.vue";
import { EditLinkForm, DeleteLinkForm } from "@/components";
import { useQueryClient } from "@tanstack/vue-query";
import { ActionIcon } from "@/ui";

interface CardProps {
  id: string;
  url: string;
  slug: string;
  description?: string;
}
const { id, url, slug, description } = withDefaults(defineProps<CardProps>(), {
  description: "",
});
const { copy, isSupported } = useClipboard();
const toast = useToast();
const targetUrl = `${window.location.protocol}//${window.location.host}/s/${slug}`;
const copyUrl = () => {
  if (isSupported) {
    copy(targetUrl);
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "URL copied to clipboard",
      life: 3000,
    });
  } else {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Clipboard not supported",
      life: 3000,
    });
  }
};
const [isEditOpen, toggleEditModal] = useToggle(false);
const [isDeleteOpen, toggleDeleteModal] = useToggle(false);
const [isQRCodeOpen, toggleQRCodeModal] = useToggle(false);

const menuOpened: Ref<InstanceType<typeof Menu> | null> = ref(null);

const toggleMenu = (event: Event) => {
  if (menuOpened.value) {
    menuOpened.value.toggle(event);
  }
};

const queryClient = useQueryClient();
const invalidateAllLinks = async () => {
  await queryClient.invalidateQueries({
    predicate: (query) => {
      return query.queryKey.includes("allLinks");
    },
  });
};

const handleDeletionSuccess = async () => {
  toggleDeleteModal();
  await invalidateAllLinks();
};
const handleEditSuccess = async () => {
  toggleEditModal();
  await invalidateAllLinks();
  window.location.reload();
};

const menuItems: Ref<MenuProps["model"]> = ref([
  {
    label: "Actions",
    items: [
      { label: "Copy", icon: "pi pi-copy", command: copyUrl },
      { label: "Edit", icon: "pi pi-pencil", command: () => toggleEditModal() },
      {
        label: "Delete",
        icon: "pi pi-trash",
        command: () => toggleDeleteModal(),
      },
    ],
  },
]);
</script>
<template>
  <div
    class="flex justify-between rounded-lg p-4 transition-all hover:shadow-lg bg-surface-50 text-white"
  >
    <div class="flex flex-col w-2/3">
      <div class="flex items-center gap-x-3 mb-2 items-center w-full">
        <a
          class="text-lg text-surface-900 font-semibold transition-all hover:text-primary-500 no-underline sm:max-w-[100px] truncate"
          target="_blank"
          rel="noreferrer"
          :href="targetUrl"
        >
          /s/{{ slug }}
        </a>
        <div class="flex items-center gap-x-1">
          <ActionIcon icon="pi pi-copy" @click="copyUrl" />
          <ActionIcon icon="pi pi-qrcode" @click="toggleQRCodeModal()" />
        </div>
      </div>
      <p class="text-white dark:text-gray-300 mb-1 truncate">{{ url }}</p>
      <p class="text-gray-7 dark:text-gray-400 text-sm truncate">
        {{ description }}
      </p>
    </div>
    <div class="flex flex-col max-w-1/3">
      <ActionIcon
        icon="pi pi-sliders-h"
        @click="toggleMenu as Function"
        aria-haspopup="true"
        :aria-controls="`link-item-${id}`"
      />
      <Menu
        :id="`link-item-${id}`"
        :model="menuItems"
        :popup="true"
        ref="menuOpened"
      />
      <Dialog
        :draggable="false"
        :header="`Edit ${slug}`"
        v-model:visible="isEditOpen"
        :modal="true"
      >
        <EditLinkForm
          :handle-success="handleEditSuccess"
          :linkId="id"
          :url="url"
          :description="description"
        />
      </Dialog>
      <Dialog
        :draggable="false"
        :header="`Delete ${slug}`"
        v-model:visible="isDeleteOpen"
        :modal="true"
      >
        <DeleteLinkForm :handle-success="handleDeletionSuccess" :linkId="id" />
      </Dialog>
      <Dialog
        :draggable="false"
        header="QR Code"
        v-model:visible="isQRCodeOpen"
        :modal="true"
      >
        <div class="flex flex-col items-center">
          <qrcode-vue
            render-as="svg"
            :value="targetUrl"
            class="w-64 h-64 mx-auto p-4 bg-white"
          />
          <p class="text-center mt-5 text-sm">
            Scan the QR code above to quickly access your URL on a mobile
            device.
          </p>
        </div>
      </Dialog>
    </div>
  </div>
</template>
