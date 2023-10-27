import type { NextPage } from "next";
import { Layout } from "components";
import Link from "next/link";
import { Container } from "@acme/ui";

const index: NextPage = () => {
  return (
    <Layout>
      <Container>
        <Link href="/posts">Posts</Link>
      </Container>
    </Layout>
  );
};

export default index;
