import { FC, useState } from "react";
import {
  Button,
  Checkbox,
  useMantineColorScheme,
  useMantineTheme,
  Menu,
  rem,
} from "@mantine/core";
import { theme } from "theme.ts";
import { MantineProvider } from "@mantine/core";
import { ColorPicker, Text, Stack } from "@mantine/core";
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from "@tabler/icons-react";

const MenuDemo = () => {
  return (
    <Menu>
      <Menu.Target>
        <Button className="w-auto self-start">Toggle menu</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item
          leftSection={
            <IconSettings style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Settings
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconMessageCircle style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Messages
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconPhoto style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Gallery
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconSearch style={{ width: rem(14), height: rem(14) }} />
          }
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          leftSection={
            <IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Transfer my data
        </Menu.Item>
        <Menu.Item
          color="red"
          leftSection={
            <IconTrash style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

const ColorPickerDemo = () => {
  const [value, onChange] = useState("rgba(47, 119, 150, 0.7)");

  return (
    <Stack>
      <ColorPicker format="hex" value={value} onChange={onChange} />
      <Text>{value}</Text>
    </Stack>
  );
};

const ToggleThemeButton = () => {
  const theme = useMantineTheme();
  console.log(theme);

  const { setColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <Button
      onClick={() => setColorScheme(colorScheme === "dark" ? "light" : "dark")}
      className="hover:bg-red-6 dark:hover:bg-green-6"
    >
      Toggle Theme
    </Button>
  );
};

const App: FC = () => {
  return (
    <MantineProvider
      defaultColorScheme="dark"
      theme={{
        ...theme,
      }}
    >
      <div className="flex gap-4 p-2 flex-col">
        <div className="flex gap-4 flex-wrap">
          <ToggleThemeButton />
          <Button color="dark">Hellow</Button>
          <Button>Hellow</Button>
          <Button variant="light">Hellow</Button>
          <Button>Hellow</Button>

          <Button hiddenFrom="sm" color="orange">
            Hidden from sm tailwind
          </Button>

          <Button color="orange" className="sm:hidden block">
            Hidden from sm
          </Button>

          <Button visibleFrom="xl" color="indigo">
            mantine
          </Button>

          <Button color="indigo" className="xl:block hidden">
            tailwind
          </Button>
        </div>
        <div>
          <Checkbox defaultChecked label="I agree to sell my privacy" />
        </div>
        <div>
          <ColorPickerDemo />
        </div>
        <div className="flex gap-4">
          <MenuDemo />
          <MenuDemo />
        </div>
      </div>
    </MantineProvider>
  );
};

export default App;
