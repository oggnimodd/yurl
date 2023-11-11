import { ActionIcon, rem } from "@mantine/core";
import { spotlight } from "@mantine/spotlight";
import { IconCommand } from "@tabler/icons-react";

const CommandButton = () => {
  return (
    <>
      <ActionIcon
        variant="outline"
        className="w-[40px] h-[40px]"
        radius="xl"
        onClick={spotlight.open}
      >
        <IconCommand style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </ActionIcon>
    </>
  );
};

export default CommandButton;
