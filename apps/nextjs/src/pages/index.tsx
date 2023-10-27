import type { NextPage } from "next";
import { Layout, Post } from "components";

const index: NextPage = () => {
  return (
    <Layout>
      <Post />
    </Layout>
  );
};

export default index;
