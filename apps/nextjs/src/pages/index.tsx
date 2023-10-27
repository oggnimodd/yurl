import type { NextPage } from "next";
import { Layout } from "components";
import { api } from "utils";

const index: NextPage = () => {
  const posts = api.post.all.useQuery();

  console.log(posts);

  return (
    <Layout>
      <p>Hello, World!</p>
    </Layout>
  );
};

export default index;
