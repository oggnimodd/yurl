import { FC } from "react";
import { Paper, Text, Button } from "@mantine/core";

const Card: FC = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Paper p={"xl"} className="gap-3 flex-col flex">
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus,
          optio.
        </Text>
        <Button className="self-start">Test</Button>
      </Paper>
      <Paper p={"xl"} className="gap-3 flex-col flex">
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus,
          optio.
        </Text>
        <Button className="self-start">Hello</Button>
      </Paper>
    </div>
  );
};

export default Card;
