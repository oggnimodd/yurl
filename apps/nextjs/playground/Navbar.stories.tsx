import { FC } from "react";
import { Button, Avatar, User, Skeleton } from "@nextui-org/react";
import { Brand, Container, cn } from "@acme/ui";
import Link from "next/link";
import {
  User2 as LoginIcon,
  Newspaper as FeedIcon,
  BookPlus as CreateCommunityIcon,
  Settings as SettingsIcon,
  Moon as DarkThemeIcon,
  Sun as LightThemeIcon,
  Power as LogOutIcon,
} from "lucide-react";
import { useUser, SignInButton, useAuth } from "@clerk//clerk-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import { useLadleTheme } from "./theme";

const Navbar: FC = () => {
  const { isLoaded, user } = useUser();

  return (
    <Container className="flex items-center py-5 justify-between">
      <Link href="/">
        <Brand title="Rebbit" />
      </Link>

      {!isLoaded && <Skeleton className="w-10 h-10 rounded-full" />}

      {isLoaded && !user && (
        <SignInButton>
          <Button color="primary" startContent={<LoginIcon size={16} />}>
            Login
          </Button>
        </SignInButton>
      )}

      {isLoaded && user && <UserAccountNavigation />}
    </Container>
  );
};

const UserAccountNavigation = () => {
  const { isLoaded, user } = useUser();
  const { signOut } = useAuth();
  const { toggleTheme, theme } = useLadleTheme();
  const NAV_ICON_SIZE = 20;

  if (!user || !isLoaded) return null;

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          as="button"
          isBordered
          className="transition-transform select-none"
          src={user.imageUrl}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" disabledKeys={["profile"]}>
        <DropdownSection aria-label="Profile & Actions" showDivider>
          <DropdownItem
            isReadOnly
            key="profile"
            className="h-14 gap-2 opacity-100"
          >
            <User
              name={user.fullName}
              description={user.primaryEmailAddress?.emailAddress}
              classNames={{
                name: "text-default-600",
                description: "text-default-500",
              }}
              avatarProps={{
                size: "sm",
                src: user.imageUrl,
              }}
            />
          </DropdownItem>
        </DropdownSection>

        <DropdownItem
          startContent={<FeedIcon size={NAV_ICON_SIZE} className="mr-2" />}
          key="feed"
        >
          Feed
        </DropdownItem>
        <DropdownItem
          startContent={
            <CreateCommunityIcon size={NAV_ICON_SIZE} className="mr-2" />
          }
          key="create-community"
        >
          Create Community
        </DropdownItem>
        <DropdownItem
          startContent={<SettingsIcon size={NAV_ICON_SIZE} className="mr-2" />}
          key="settings"
        >
          Settings
        </DropdownItem>
        <DropdownItem
          startContent={
            theme === "dark" ? (
              <DarkThemeIcon className="mr-2" size={NAV_ICON_SIZE} />
            ) : (
              <LightThemeIcon className="mr-2" size={NAV_ICON_SIZE} />
            )
          }
          onPress={() => toggleTheme()}
          key="toggle-theme"
        >
          Toggle Theme
        </DropdownItem>
        <DropdownItem
          startContent={<LogOutIcon className="mr-2" size={NAV_ICON_SIZE} />}
          onPress={() => signOut()}
          key="sign-out"
          className="text-danger"
          color="danger"
        >
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export const DropdownTest = () => {
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Open Menu</Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
        <DropdownItem
          key="new"
          shortcut="⌘N"
          description="Create a new file"
          startContent={<LoginIcon className={iconClasses} />}
        >
          New file
        </DropdownItem>
        <DropdownItem
          key="copy"
          shortcut="⌘C"
          description="Copy the file link"
          startContent={<LoginIcon className={iconClasses} />}
        >
          Copy link
        </DropdownItem>
        <DropdownItem
          key="edit"
          shortcut="⌘⇧E"
          showDivider
          description="Allows you to edit the file"
          startContent={<LoginIcon className={iconClasses} />}
        >
          Edit file
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          shortcut="⌘⇧D"
          description="Permanently delete the file"
          startContent={
            <LoginIcon className={cn(iconClasses, "text-danger")} />
          }
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export const Default = () => {
  return <Navbar />;
};
