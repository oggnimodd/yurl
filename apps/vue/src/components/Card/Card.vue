<script setup lang="ts">
import { defineProps, withDefaults } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Menu from "primevue/menu";
import { useToast } from "primevue/usetoast";
import { useClipboard } from "@vueuse/core";
import { useToggle } from "@vueuse/core";
import QrcodeVue from "qrcode.vue";
import { EditLinkForm, DeleteLinkForm } from "@/components";
import { useQueryClient } from "@tanstack/vue-query";

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
const [menuOpened, toggleMenu] = useToggle(false);

const queryClient = useQueryClient();
const invalidateAllLinks = async () => {
  await queryClient.invalidateQueries({
    queryKey: ["allLinks"],
  });
};
const handleDeletionSuccess = async () => {
  toggleDeleteModal(false);
  await invalidateAllLinks();
};

const handleEditSuccess = async () => {
  toggleEditModal(false);
  await invalidateAllLinks();
};

const menuItems = [
  { label: "Copy", icon: "pi pi-copy", command: copyUrl },
  { label: "Edit", icon: "pi pi-pencil", command: () => toggleEditModal() },
  { label: "Delete", icon: "pi pi-trash", command: () => toggleDeleteModal() },
];
</script>

<template>
  <div
    class="flex justify-between rounded-lg p-4 transition-all hover:shadow-lg bg-surface-300 text-white"
  >
    <div class="flex flex-col w-2/3">
      <div class="flex items-center gap-x-3 mb-2 items-center w-full">
        <a
          class="text-lg font-semibold text-white dark:text-gray-1 transition-all hover:text-blue-6 dark:hover:text-blue-6 no-underline sm:max-w-[100px] truncate"
          target="_blank"
          rel="noreferrer"
          :href="targetUrl"
        >
          /s/{{ slug }}
        </a>
        <div class="flex items-center gap-x-1">
          <Button size="small" icon="pi pi-copy" @click="copyUrl" />
          <Button
            size="small"
            icon="pi pi-qrcode"
            @click="() => toggleQRCodeModal()"
          />
        </div>
      </div>
      <p class="text-white dark:text-gray-5 mb-1 truncate">
        {{ url }}
      </p>
      <p class="text-gray-7 dark:text-gray-6 text-sm truncate">
        {{ description }}
      </p>
    </div>
    <div class="flex flex-col max-w-1/3">
      <Button
        label="Options"
        icon="pi pi-ellipsis-v"
        @click="() => toggleMenu()"
        outlined
        size="small"
      />
      <Menu :model="menuItems" :popup="true" v-model="menuOpened" ref="menu" />
      <Dialog header="Edit" :visible="isEditOpen" :modal="true">
        <EditLinkForm
          @success="handleEditSuccess"
          :linkId="id"
          :url="url"
          :description="description"
        />
      </Dialog>
      <Dialog header="Delete" :visible="isDeleteOpen" :modal="true">
        <DeleteLinkForm @success="handleDeletionSuccess" :linkId="id" />
      </Dialog>
      <Dialog header="QR Code" :visible="isQRCodeOpen" :modal="true">
        <qrcode-vue render-as="svg" :value="targetUrl" />
        <p class="text-center mt-5 text-sm">
          Scan the QR code above to quickly access your URL on a mobile device.
        </p>
      </Dialog>
    </div>
  </div>
</template>
