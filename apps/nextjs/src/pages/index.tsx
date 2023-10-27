"use client";

import type { NextPage } from "next";
import { Layout } from "components";
import { api } from "utils";
import { Input, Spinner, Button } from "@nextui-org/react";
import { FormEvent, useRef } from "react";
import { Container } from "@acme/ui";

const index: NextPage = () => {
  const posts = api.post.all.useQuery();
  const deletePost = api.post.delete.useMutation({
    onSuccess: () => posts.refetch(),
  });
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

  const onDeletePost = async (id: string) => {
    await deletePost.mutateAsync(id);
  };

  return (
    <Layout>
      <Container>
        <form onSubmit={onSubmit} className="max-w-[400px] flex gap-x-4">
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

        <div className="flex flex-col gap-2 mt-4">
          {!posts.isLoading &&
            posts.data &&
            posts.data.map((post) => {
              return (
                <div
                  key={post.id}
                  className="p-5 rounded-sm flex flex-col gap-3 bg-content1 p-5"
                >
                  <p>{post.title}</p>
                  <p>{post.content}</p>
                  <div>
                    <Button
                      isLoading={deletePost.isLoading}
                      className="justify-self-start w-auto"
                      onClick={() => onDeletePost(post.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
        </div>
      </Container>
    </Layout>
  );
};

export default index;
