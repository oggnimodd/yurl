import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInput, Textarea, Alert, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { api } from "trpc";
import { editLinkSchema, EditLinkData } from "./models";
import { IconCheck } from "@tabler/icons-react";
import { FC } from "react";
import { IconInfoCircle } from "@tabler/icons-react";

interface EditLinkFormProps {
  linkId: string;
  url: string;
  description?: string;
  handleSuccess?: () => void;
}

const EditLinkForm: FC<EditLinkFormProps> = ({
  linkId,
  url,
  description = "",
  handleSuccess = () => {},
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editLinkSchema),
    defaultValues: { url, description },
  });

  const { mutateAsync: editLink, isLoading } = api.link.editLink.useMutation({
    onSuccess: () => {
      handleSuccess();
      notifications.show({
        title: "Success",
        message: "Link edited successfully",
        color: "green",
      });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "An error occurred while editing the link",
        color: "red",
      });
    },
  });

  const onSubmit = (values: EditLinkData) => {
    editLink({
      linkId,
      ...values,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="mb-5">
        <Text fw="bold">Enter the new URL:</Text>
        <TextInput
          error={errors.url?.message}
          placeholder="https://"
          {...register("url")}
        />
      </div>
      <div className="mb-3">
        <Text fw="bold">Description:</Text>
        <Textarea {...register("description")} />
      </div>
      <Alert icon={<IconInfoCircle />} color="red" className="mb-3">
        This action is irreversible.
      </Alert>
      <div className="mt-5 flex justify-end">
        <Button
          type="submit"
          loading={isLoading}
          leftSection={<IconCheck size={18} />}
        >
          Edit link
        </Button>
      </div>
    </form>
  );
};

export default EditLinkForm;
