import UserMenu from "./UserMenu";
import ToggleThemeButton from "./ToggleThemeButton";
import CommandPaletteButton from "./CommandPaletteButton";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@nextui-org/react";

const AuthenticatedUserNavigation = () => {
  const { isLoaded, user } = useUser();

  return (
    <div className="flex items-center gap-3 ml-auto">
      <ToggleThemeButton />
      <CommandPaletteButton />
      {!isLoaded ? (
        <Skeleton className="w-10 h-10 rounded-full" />
      ) : (
        <UserMenu />
      )}
    </div>
  );
};

export default AuthenticatedUserNavigation;
