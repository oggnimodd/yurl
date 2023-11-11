import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoonFilled, IconSun } from "@tabler/icons-react";

const ThemeButton = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ActionIcon
      variant="outline"
      className="w-[40px] h-[40px]"
      radius="xl"
      onClick={() => setColorScheme(isDark ? "light" : "dark")}
    >
      {isDark ? <IconMoonFilled size={20} /> : <IconSun size={20} />}
    </ActionIcon>
  );
};

export default ThemeButton;
