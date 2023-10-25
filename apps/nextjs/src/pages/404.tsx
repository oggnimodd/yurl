import React from "react";
import Head from "next/head";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <Head>
        <title>404 | Page Not Found</title>
      </Head>

      <div className="mt-5 flex justify-center">
        <Button as={Link} href="/" size="sm">
          Back to Home
        </Button>
      </div>
    </>
  );
};

export default NotFound;
