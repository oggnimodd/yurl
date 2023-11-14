<script setup lang="ts">
import { ref, defineProps } from "vue";
import { useForm } from "vee-validate";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import { api } from "@/trpc";
import { useMutation } from "@tanstack/vue-query";
import { nanoid } from "nanoid";
import Message from "primevue/message";
import FormFieldWrapper from "./FormFieldWrapper.vue";

const VALIDATION_ERROR_MESSAGE =
  "The values do not match. Check the validation.";
const DELETION_ERROR_MESSAGE = "An error occurred while deleting the link";
const DELETION_SUCCESS_MESSAGE = "Link deleted successfully";

interface DeleteLinkFormProps {
  linkId: string;
  handleSuccess?: () => Promise<void>;
}

const { linkId, handleSuccess } = withDefaults(
  defineProps<DeleteLinkFormProps>(),
  {
    handleSuccess: () => Promise.resolve(),
  },
);

const toast = useToast();

const { handleSubmit, errors, defineInputBinds, setErrors, values } = useForm();

const validate = defineInputBinds("validate");
const validationTarget = ref(nanoid(5));

const { mutateAsync: deleteLink, isPending } = useMutation({
  mutationKey: ["delete-link", linkId],
  mutationFn: async () => {
    return api.link.deleteLink.mutate({ linkId });
  },
  onSuccess: async () => {
    await handleSuccess();
    toast.add({
      severity: "success",
      summary: "Success",
      detail: DELETION_SUCCESS_MESSAGE,
      life: 3000,
    });
  },
  onError: () => {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: DELETION_ERROR_MESSAGE,
      life: 3000,
    });
  },
});

const onSubmit = handleSubmit(() => {
  if (validationTarget.value === values.validate) {
    deleteLink();
  } else {
    setErrors({
      validate: VALIDATION_ERROR_MESSAGE,
    });
    toast.add({
      severity: "error",
      summary: "Error",
      detail: VALIDATION_ERROR_MESSAGE,
      life: 3000,
    });
  }
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <Message severity="error" class="mb-3 font-semibold">
      Are you sure you want to delete this link? This action is irreversible.
    </Message>
    <div class="mb-5">
      <div class="font-semibold mb-1">Enter the following to confirm:</div>
      <div class="text-primary-500 italic font-bold mb-3">
        {{ validationTarget }}
      </div>
      <FormFieldWrapper>
        <InputText
          v-bind="validate"
          placeholder="..."
          :class="{ 'p-invalid': errors.validate }"
        />
        <small v-if="errors.validate" class="p-error">
          {{ errors.validate }}
        </small>
      </FormFieldWrapper>
    </div>
    <div class="mt-5 flex justify-end">
      <Button
        :loading="isPending"
        icon="pi pi-trash"
        label="Delete link"
        type="submit"
        size="small"
      />
    </div>
  </form>
</template>
