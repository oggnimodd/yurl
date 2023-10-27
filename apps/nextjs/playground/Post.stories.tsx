import { Input, Button } from "@nextui-org/react";
import { FormEvent, useRef } from "react";
import { playgroundTrpc } from "./trpc";

export const Test = () => {
  const posts = playgroundTrpc.post.all.useQuery();
  const addPost = playgroundTrpc.post.create.useMutation({
    onSuccess: () => posts.refetch(),
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const value = inputRef.current?.value;

    if (value) {
      await addPost.mutateAsync({
        title: value,
        content: value,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-[400px]">
        <Input ref={inputRef} type="text" />
        <Button isLoading={addPost.isLoading} type="submit">
          Add Post
        </Button>
      </form>

      {posts.isLoading ? (
        <p>Loading...</p>
      ) : (
        posts.data?.map((post) => <p key={post.id}>{post.title}</p>)
      )}
    </div>
  );
};
