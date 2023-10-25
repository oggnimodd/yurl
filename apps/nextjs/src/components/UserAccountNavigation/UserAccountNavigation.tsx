import { useAuth, useUser } from "@clerk/nextjs";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import {
  Newspaper as FeedIcon,
  BookPlus as CreateCommunityIcon,
  Settings as SettingsIcon,
  Moon as DarkThemeIcon,
  Sun as LightThemeIcon,
  Power as LogOutIcon,
} from "lucide-react";
import Link from "next/link";

const UserAccountNavigation = () => {
  const { isLoaded, user } = useUser();
  const { signOut } = useAuth();
  const { setTheme, theme } = useTheme();
  const NAV_ICON_SIZE = 20;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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
            textValue="Profile"
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
          href="/feed"
          as={Link}
          startContent={<FeedIcon size={NAV_ICON_SIZE} className="mr-2" />}
          key="feed"
        >
          Feed
        </DropdownItem>
        <DropdownItem
          href="/community"
          as={Link}
          startContent={
            <CreateCommunityIcon size={NAV_ICON_SIZE} className="mr-2" />
          }
          key="create-community"
        >
          Create Community
        </DropdownItem>
        <DropdownItem
          href="/settings"
          as={Link}
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

export default UserAccountNavigation;
