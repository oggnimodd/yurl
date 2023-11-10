import { Grid } from "@mantine/core";
import Card, { CardProps } from "./Card";

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
