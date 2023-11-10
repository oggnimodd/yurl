import { useState, useEffect, FC } from "react";
import { useForm } from "react-hook-form";
import { Button, TextInput, Alert, Text } from "@mantine/core";
import { IconTrash, IconInfoCircle } from "@tabler/icons-react";
import { nanoid } from "nanoid";
import { notifications } from "@mantine/notifications";
import { api } from "trpc";

const VALIDATION_ERROR_MESSAGE =
  "The values do not match. Check the validation.";
const DELETION_ERROR_MESSAGE = "An error occurred while deleting the link";
const DELETION_SUCCESS_MESSAGE = "Link deleted successfully";

interface DeleteLinkFormProps {
  linkId: string;
  handleSuccess?: () => void;
}

const DeleteLinkForm: FC<DeleteLinkFormProps> = ({
  linkId,
  handleSuccess = () => {},
}) => {
  const {
    handleSubmit,
    register,
    getValues,
    setError,
    formState: { errors },
  } = useForm();
  const [validate, setValidate] = useState(String);

  useEffect(() => {
    const random = nanoid(5);
    setValidate(random);
  }, []);

  const { mutateAsync: deleteLink, isLoading } =
    api.link.deleteLink.useMutation({
      onSuccess: () => {
        handleSuccess();
        notifications.show({
          title: "Success",
          message: DELETION_SUCCESS_MESSAGE,
          color: "green",
        });
      },
      onError: () => {
        notifications.show({
          title: "Error",
          message: DELETION_ERROR_MESSAGE,
          color: "red",
        });
      },
    });

  const onSubmit = () => {
    if (validate === getValues("validate")) {
      deleteLink({
        linkId,
      });
    } else {
      setError("validate", {
        message: VALIDATION_ERROR_MESSAGE,
      });

      notifications.show({
        title: "Error",
        message: VALIDATION_ERROR_MESSAGE,
        color: "red",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Alert
        color="red"
        className="mb-3 font-semibold"
        icon={<IconInfoCircle />}
      >
        Are you sure you want to delete this link? This action is irreversible.
      </Alert>
      <div className="mb-5">
        <Text fw="bold">Enter the following to confirm:</Text>
        <Text c="blue" fs="italic" fw="bold">
          {validate}
        </Text>
        <div className="mt-3">
          <TextInput
            error={
              typeof errors.validate?.message === "string"
                ? errors.validate?.message
                : undefined
            }
            placeholder="..."
            {...register("validate", { required: true, maxLength: 20 })}
          />
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <Button
          type="submit"
          loading={isLoading}
          leftSection={<IconTrash size={18} />}
        >
          Delete link
        </Button>
      </div>
    </form>
  );
};

export default DeleteLinkForm;
