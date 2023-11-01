"use client";

import { api } from "@/utils";
import { Input, Spinner, Button } from "@nextui-org/react";
import { FormEvent, useRef } from "react";
import { Container } from "@/ui";
import PostCard from "./PostCard";

const Post = () => {
  const posts = api.post.all.useQuery();
  const addPost = api.post.create.useMutation({
    onSuccess: () => posts.refetch(),
  });
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current && inputRef.current.value !== "") {
      await addPost.mutateAsync({
        title: inputRef.current.value,
        content: inputRef.current.value,
      });
      inputRef.current.value = "";
      inputRef.current.blur();
      inputRef.current.focus();
    }
  };

  return (
    <Container>
      <form onSubmit={onSubmit} className="max-w-[400px] flex gap-4">
        <Input placeholder="Input post" ref={inputRef} type="text" />
        <Button isLoading={addPost.isLoading} type="submit">
          Add
        </Button>
      </form>

      {posts.isLoading && (
        <div className="h-10 w-full">
          <Spinner color="primary" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {!posts.isLoading &&
          posts.data &&
          posts.data.map((post) => {
            return <PostCard key={post.id} {...post} />;
          })}
      </div>
    </Container>
  );
};

export default Post;
