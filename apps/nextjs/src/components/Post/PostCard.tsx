import { Button } from "@nextui-org/react";
import { FC, useState } from "react";
import { api } from "utils";
import type { Post } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";

type PostCardProps = Post;

const PostCard: FC<PostCardProps> = ({ id, title, content }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();
  const deletePost = api.post.delete.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(getQueryKey(api.post));
      setIsDeleting(false);
    },
  });
  const onDeletePost = async (id: string) => {
    setIsDeleting(true);
    await deletePost.mutateAsync(id);
  };

  return (
    <div className="p-5 rounded-sm flex flex-col gap-3 bg-content1 p-5">
      <p>{title}</p>
      <p>{content}</p>
      <div>
        <Button
          isLoading={isDeleting}
          className="justify-self-start w-auto"
          onClick={() => onDeletePost(id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default PostCard;
