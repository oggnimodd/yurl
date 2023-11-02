import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@nextui-org/react";
import { ICON_SIZE, navButtonBaseProps } from "./constants";
import { useIsMounted } from "@/hooks";

const ToggleThemeButton = () => {
  const isMounted = useIsMounted();

  const { setTheme, theme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (!isMounted()) {
    return null;
  }

  return (
    <Button
      {...navButtonBaseProps}
      onPress={toggleTheme}
      startContent={
        isDark ? <Moon size={ICON_SIZE} /> : <Sun size={ICON_SIZE} />
      }
    />
  );
};

export default ToggleThemeButton;
