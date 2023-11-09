<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import InputText from "primevue/inputtext";
import { nextTick } from "vue";
import { api } from "@/trpc";
import { useQuery, useMutation } from "@tanstack/vue-query";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import FormFieldWrapper from "./FormFieldWrapper.vue";
import {
  linkCreationSchema,
  LinkCreationData,
  linkCreationDefaultValues,
} from "./models";
import { watch } from "vue";

const router = useRouter();
const toast = useToast();

const { handleSubmit, defineInputBinds, errors, setValues, setErrors, values } =
  useForm({
    validationSchema: toTypedSchema(linkCreationSchema),
    initialValues: linkCreationDefaultValues,
  });

const url = defineInputBinds("url");
const slug = defineInputBinds("slug");
const description = defineInputBinds("description");

const { isPending: isCreatingLink, mutateAsync: addLinkMutation } = useMutation(
  {
    mutationKey: ["create-link", values.slug],
    mutationFn: async (data: LinkCreationData) => {
      return api.link.createLink.mutate({
        ...data,
        description: values.description || "",
      });
    },
  },
);

const {
  refetch: checkSlug,
  isError: isCheckingSlugError,
  isLoading: isCheckingSlug,
} = useQuery({
  queryKey: ["check-slug", values.slug],
  queryFn: async () => {
    return api.link.checkSlug.query({ customSlug: values.slug as string });
  },
  refetchOnWindowFocus: false,
  enabled: Boolean(values.slug),
});

watch(isCheckingSlugError, (newError) => {
  if (newError) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "An error occurred while checking the slug",
      life: 3000,
    });
  }
});

const checkSlugExists = async () => {
  const { data } = await checkSlug();
  return data?.isSlugExist;
};

const onSubmit = handleSubmit(async (values: LinkCreationData) => {
  const slugExists = await checkSlugExists();

  if (slugExists) {
    setErrors({
      slug: "Slug already exists",
    });
  } else if (typeof slugExists !== "undefined") {
    try {
      await addLinkMutation(values);

      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Link created successfully",
        life: 3000,
      });

      router.push("/dashboard");
    } catch (error) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "An error occurred while submitting the form",
        life: 3000,
      });
    }
  }
});

const generateRandomSlug = async () => {
  const slugValue = Math.random().toString(36).substring(2, 10);
  await nextTick();
  setValues({ slug: slugValue });
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-6 max-w-2xl">
    <FormFieldWrapper>
      <label for="url">Enter the URL here:</label>
      <InputText
        v-bind="url"
        placeholder="https://"
        :class="{ 'p-invalid': errors.url }"
      />
      <small v-if="errors.url" class="p-error">{{ errors.url }}</small>
    </FormFieldWrapper>

    <FormFieldWrapper>
      <label for="slug">Custom slug:</label>
      <div class="p-inputgroup">
        <InputText
          v-bind="slug"
          placeholder="Custom Slug"
          :class="{ 'p-invalid': errors.slug }"
        />
        <Button @click="generateRandomSlug" label="Get random slug" />
      </div>
      <small v-if="errors.slug" class="p-error">{{ errors.slug }}</small>
    </FormFieldWrapper>

    <FormFieldWrapper>
      <label for="slug">Description:</label>
      <Textarea
        placeholder="Optional"
        v-bind="description"
        :class="{ 'p-invalid': errors.description }"
      />
      <small v-if="errors.description" class="p-error">
        {{ errors.description }}
      </small>
    </FormFieldWrapper>

    <Button
      :loading="isCreatingLink || isCheckingSlug"
      class="self-start"
      icon="pi pi-send"
      label="Create"
      type="submit"
    />
  </form>
</template>
