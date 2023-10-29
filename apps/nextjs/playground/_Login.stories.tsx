import React, { FC } from "react";
import { playgroundTrpc } from "./trpc";
import { SignInButton, SignOutButton, useAuth } from "@clerk/clerk-react";
import { Button } from "@nextui-org/react";

export const Login: FC = () => {
  const { data } = playgroundTrpc.post.hello.useQuery();
  const { data: secret, isLoading: isSecretLoading } =
    playgroundTrpc.post.protected.useQuery();
  const { userId, isLoaded } = useAuth();

  if (!isLoaded) {
    return <p>loading..</p>;
  }

  return (
    <div>
      <p className="mb-5">{data}</p>
      {!userId && (
        <SignInButton>
          <Button color="primary">Login</Button>
        </SignInButton>
      )}
      {userId && !isSecretLoading && (
        <>
          <SignOutButton>
            <Button color="danger">Logout</Button>
          </SignOutButton>
          <p className="mt-3">Congrats, You are see this secret : {secret}</p>
        </>
      )}
    </div>
  );
};
