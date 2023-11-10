import { Grid } from "@mantine/core";
import Card, { CardProps } from "./Card";
import { api } from "trpc";

const mockData: CardProps[] = [
  {
    id: "1",
    url: "https://example.com/1",
    slug: "slug1",
    description: "Description for card 1",
  },
  {
    id: "2",
    url: "https://example.com/2",
    slug: "slug2",
    description: "Description for card 2",
  },
  {
    id: "3",
    url: "https://example.com/3",
    slug: "slug3",
    description: "Description for card 3",
  },
  {
    id: "4",
    url: "https://example.com/3",
    slug: "slug3",
  },
];

export const Default = () => {
  return (
    <Grid>
      {mockData.map((data) => (
        <Grid.Col key={data.id} span={4}>
          <Card {...data} />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export const Single = () => {
  return (
    <div className="max-w-[400px]">
      <Card {...mockData[0]} />
    </div>
  );
};

export const UsingApi = () => {
  const { data: links, isLoading } = api.link.allLinks.useQuery({
    filter: "",
  });

  if (isLoading) {
    return <span>loading...</span>;
  }

  if (!links) {
    return <span>No links</span>;
  }

  return (
    <Grid>
      {links.map((data) => (
        <Grid.Col key={data.id} span={4}>
          <Card {...data} description={data.description || ""} />
        </Grid.Col>
      ))}
    </Grid>
  );
};
