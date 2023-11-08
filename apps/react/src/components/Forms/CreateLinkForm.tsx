import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, Textarea, Button, Paper } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { FC } from "react";
import { api } from "trpc";
import {
  linkCreationSchema,
  LinkCreationData,
  linkCreationDefaultValues,
} from "./models";
import { IconSend } from "@tabler/icons-react";

const CreateLinkForm: FC = () => {
  const {
    getValues,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm({
    resolver: zodResolver(linkCreationSchema),
    defaultValues: linkCreationDefaultValues,
  });

  const navigate = useNavigate();

  const { mutateAsync: addLinkMutation, isLoading: isCreatingLink } =
    api.link.createLink.useMutation();
  const { refetch } = api.link.checkSlug.useQuery(
    {
      customSlug: getValues("slug"),
    },
    {
      refetchOnWindowFocus: false,
      enabled: Boolean(getValues("slug")),
    },
  );

  const checkSlugExists = async () => {
    try {
      const { data } = await refetch();
      return data?.isSlugExist;
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "An error occurred while checking the slug",
        color: "red",
      });
    }
  };

  const onSubmit = async (data: LinkCreationData) => {
    const slugExists = await checkSlugExists();

    if (slugExists) {
      setError("slug", {
        type: "manual",
        message: "Slug already exists",
      });
    } else if (typeof slugExists !== "undefined") {
      try {
        await addLinkMutation({
          ...data,
          description: data.description || "",
        });

        notifications.show({
          title: "Success",
          message: "Link created successfully",
          color: "green",
        });

        navigate("/dashboard");
      } catch (error) {
        notifications.show({
          title: "Error",
          message: "An error occurred while submitting the form",
          color: "red",
        });
      }
    }
  };

  const generateRandomSlug = () => {
    const slug = Math.random().toString(36).substring(2, 10);
    setValue("slug", slug);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <Paper className="max-w-3xl flex flex-col gap-y-5">
        <Controller
          control={control}
          name="url"
          render={({ field }) => (
            <TextInput
              label="Enter the URL here:"
              placeholder="https://"
              {...field}
              error={errors.url?.message}
            />
          )}
        />
        <div className="flex items-end w-full gap-x-3">
          <Controller
            control={control}
            name="slug"
            render={({ field }) => (
              <TextInput
                label="Custom slug:"
                {...field}
                error={errors.slug?.message}
                placeholder="Custom Slug"
                classNames={{
                  root: "w-full",
                }}
              />
            )}
          />
          <Button onClick={generateRandomSlug}>Get random slug</Button>
        </div>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <Textarea
              label="Description"
              {...field}
              error={errors.description?.message}
            />
          )}
        />
        <Button
          leftSection={<IconSend size={18} />}
          loading={isCreatingLink}
          className="self-start"
          type="submit"
        >
          Submit
        </Button>
      </Paper>
    </form>
  );
};

export default CreateLinkForm;
