<script setup lang="ts">
import { withDefaults, defineProps } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Message from "primevue/message";
import { useToast } from "primevue/usetoast";
import { api } from "@/trpc";
import { useMutation } from "@tanstack/vue-query";
import { editLinkSchema } from "./models";

interface EditLinkFormProps {
  linkId: string;
  url: string;
  description?: string;
  handleSuccess?: () => void;
}

const { linkId, handleSuccess, ...initialValues } = withDefaults(
  defineProps<EditLinkFormProps>(),
  {
    handleSuccess: () => {},
  },
);

const toast = useToast();

const { handleSubmit, errors, defineInputBinds, values } = useForm({
  validationSchema: toTypedSchema(editLinkSchema),
  initialValues: { ...initialValues },
});

const urlBind = defineInputBinds("url");
const descriptionBind = defineInputBinds("description");

const { mutateAsync: editLink, isPending } = useMutation({
  mutationKey: ["edit-link", linkId],
  mutationFn: async () => {
    return api.link.editLink.mutate({
      linkId,
      ...values,
    });
  },
  onSuccess: () => {
    handleSuccess();
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Link edited successfully",
      life: 3000,
    });
  },
  onError: () => {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "An error occurred while editing the link",
      life: 3000,
    });
  },
});

const onSubmit = handleSubmit(() => {
  editLink();
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-5">
      <div>Enter the new URL:</div>
      <InputText
        v-bind="urlBind"
        placeholder="https://"
        :class="{ 'p-invalid': errors.url }"
      />
    </div>
    <div class="mb-3">
      <div>Description:</div>
      <Textarea v-bind="descriptionBind" />
    </div>
    <Message severity="error" text="This action is irreversible." />
    <div class="mt-5 flex justify-end">
      <Button
        :loading="isPending"
        icon="pi pi-check"
        label="Edit link"
        type="submit"
      />
    </div>
  </form>
</template>
