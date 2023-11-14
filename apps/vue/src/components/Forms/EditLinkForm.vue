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
import FormFieldWrapper from "./FormFieldWrapper.vue";

interface EditLinkFormProps {
  linkId: string;
  url: string;
  description?: string;
  handleSuccess?: () => Promise<void>;
}

const { linkId, handleSuccess, ...initialValues } = withDefaults(
  defineProps<EditLinkFormProps>(),
  {
    handleSuccess: () => Promise.resolve(),
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
  onSuccess: async () => {
    await handleSuccess();
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
  <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
    <FormFieldWrapper>
      <label for="url">Enter the new URL:</label>
      <InputText
        v-bind="urlBind"
        placeholder="https://"
        :class="{ 'p-invalid': errors.url }"
      />
      <small v-if="errors.url" class="p-error">{{ errors.url }}</small>
    </FormFieldWrapper>

    <FormFieldWrapper>
      <label for="description">Enter the new description:</label>
      <Textarea
        v-bind="descriptionBind"
        placeholder="Description"
        :class="{ 'p-invalid': errors.description }"
        class="resize-y max-h-48"
      />
      <small v-if="errors.description" class="p-error">
        {{ errors.description }}
      </small>
    </FormFieldWrapper>

    <Message severity="error"> This action is irreversible. </Message>
    <div class="mt-5 flex justify-end">
      <Button
        :loading="isPending"
        icon="pi pi-pencil"
        label="Edit link"
        type="submit"
        size="small"
      />
    </div>
  </form>
</template>
