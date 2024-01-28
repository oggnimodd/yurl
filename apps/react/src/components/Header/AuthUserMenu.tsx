import { SignInButton, useAuth, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Menu, Skeleton, rem, Button } from "@mantine/core";
import { IconHome, IconPlus, IconLogout2 } from "@tabler/icons-react";
import { CSSProperties } from "react";

const menuIconBaseProps: { style: CSSProperties; stroke: string | number } = {
  style: {
    width: rem(24),
    height: rem(24),
  },
  stroke: 1.5,
};

const AuthUserMenu = () => {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const { signOut } = useAuth();

  if (!isLoaded) {
    return <Skeleton height={40} circle animate />;
  }

  if (isLoaded && !user)
    return (
      <SignInButton afterSignInUrl="/dashboard">
        <Button>Login</Button>
      </SignInButton>
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
          leftSection={<IconPlus {...menuIconBaseProps} />}
        >
          New link
        </Menu.Item>
        <Menu.Item
          to="/dashboard"
          component={Link}
          leftSection={<IconHome {...menuIconBaseProps} />}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          color="red"
          component="button"
          onClick={handleSignOut}
          leftSection={<IconLogout2 {...menuIconBaseProps} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AuthUserMenu;
