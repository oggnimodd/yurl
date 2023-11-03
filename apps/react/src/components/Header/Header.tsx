import { FC, useMemo } from "react";
import { SignInButton, useAuth, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Avatar,
  Menu,
  Skeleton,
  ActionIcon,
  useMantineColorScheme,
  rem,
  Button,
} from "@mantine/core";
import { IconMoonFilled, IconSun } from "@tabler/icons-react";
import { Spotlight, SpotlightActionData, spotlight } from "@mantine/spotlight";
import {
  IconHome,
  IconDashboard,
  IconSearch,
  IconCommand,
  IconBrandGithub,
  IconPlus,
  IconLogout2,
} from "@tabler/icons-react";
import { openLinkInNewTab } from "utils/navigation";

const AuthUserMenu = () => {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const { signOut } = useAuth();

  if (!isLoaded) {
    return <Skeleton height={40} circle animate />;
  }

  if (isLoaded && !user)
    return (
      <Button afterSignInUrl="/dashboard" component={SignInButton}>
        Login
      </Button>
    );

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <Menu position="bottom-end" shadow="md" width={200}>
      <Menu.Target>
        <Avatar
          className="cursor-pointer"
          component="button"
          alt={user?.fullName || "Profile Picture"}
          src={user?.imageUrl}
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          to="/new"
          component={Link}
          leftSection={
            <IconPlus
              style={{ width: rem(24), height: rem(24) }}
              stroke={1.5}
            />
          }
        >
          New link
        </Menu.Item>
        <Menu.Item
          to="/dashboard"
          component={Link}
          leftSection={
            <IconHome
              style={{ width: rem(24), height: rem(24) }}
              stroke={1.5}
            />
          }
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          color="red"
          component="button"
          onClick={handleSignOut}
          leftSection={
            <IconLogout2
              style={{ width: rem(24), height: rem(24) }}
              stroke={1.5}
            />
          }
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

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

const CommandPalette = () => {
  const navigate = useNavigate();

  const actions: SpotlightActionData[] = useMemo(() => {
    return [
      {
        id: "create",
        label: "Create new link",
        description: "Add a new shortened link",
        onClick: () => navigate("/new"),
        leftSection: (
          <IconPlus style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
        ),
      },
      {
        id: "home",
        label: "Home",
        description: "Get to home page",
        onClick: () => navigate("/"),
        leftSection: (
          <IconHome style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
        ),
      },
      {
        id: "dashboard",
        label: "Dashboard",
        description: "Get full information about current system status",
        onClick: () => navigate("/dashboard"),
        leftSection: (
          <IconDashboard
            style={{ width: rem(24), height: rem(24) }}
            stroke={1.5}
          />
        ),
      },
      {
        id: "source-code",
        label: "Source Code",
        description: "See source code",
        onClick: () => openLinkInNewTab("https://github.com/oggnimodd/yurl/"),
        leftSection: (
          <IconBrandGithub
            style={{ width: rem(24), height: rem(24) }}
            stroke={1.5}
          />
        ),
      },
    ];
  }, []);

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
      <Spotlight
        actions={actions}
        nothingFound="Nothing found..."
        highlightQuery
        searchProps={{
          leftSection: (
            <IconSearch
              style={{ width: rem(20), height: rem(20) }}
              stroke={1.5}
            />
          ),
          placeholder: "Search...",
        }}
      />
    </>
  );
};

const Header: FC = () => {
  return (
    <header className="w-full py-6">
      <Container className="flex items-center justify-between items-center">
        <Link
          className="inline-block text-4xl font-extrabold text-blue-6 no-underline"
          to="/"
        >
          yurl
        </Link>

        <div className="flex gap-x-3">
          <ThemeButton />
          <CommandPalette />
          <AuthUserMenu />
        </div>
      </Container>
    </header>
  );
};

export default Header;
