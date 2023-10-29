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
import { Power as LogOutIcon, Plus, LayoutDashboard, Bug } from "lucide-react";
import Link from "next/link";

const UserMenu = () => {
  const { isLoaded, user } = useUser();
  const { signOut } = useAuth();
  const NAV_ICON_SIZE = 20;

  if (!user) return null;

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          classNames={{
            base: "w-8 h-8",
          }}
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
          href="/create"
          as={Link}
          startContent={<Plus size={NAV_ICON_SIZE} className="mr-2" />}
          key="Create new link"
        >
          Create new link
        </DropdownItem>
        <DropdownItem
          href="/dahsboard"
          as={Link}
          startContent={
            <LayoutDashboard size={NAV_ICON_SIZE} className="mr-2" />
          }
          key="dashboard"
        >
          Dashboard
        </DropdownItem>
        <DropdownItem
          href=" https://github.com/oggnimodd/yurl/issues"
          as="a"
          startContent={<Bug size={NAV_ICON_SIZE} className="mr-2" />}
          key="report-bug"
        >
          Report a bug
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

export default UserMenu;
