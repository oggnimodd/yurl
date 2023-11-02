import { FC, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Loader,
  useMantineColorScheme,
  Text,
  ColorPicker,
  Stack,
} from "@mantine/core";
import { api } from "trpc";
import Provider from "Provider";
import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";

const MenuDemo = () => {
  const { user, isLoaded } = useUser();
  const { data: secret } = api.auth.getSecretMessage.useQuery();

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <div className="flex gap-4">
      {user?.id && secret && (
        <Box>
          <Text fw="bold">Congrats!</Text>
          <Text>{secret}</Text>
        </Box>
      )}

      {!user?.id && (
        <SignInButton>
          <Button color="blue">Login</Button>
        </SignInButton>
      )}

      {user?.id && (
        <SignOutButton>
          <Button color="red">SignOut</Button>
        </SignOutButton>
      )}
    </div>
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
    <Provider>
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
        </div>
      </div>
    </Provider>
  );
};

export default App;
