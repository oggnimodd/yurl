import { Command } from "lucide-react";
import { Button } from "@nextui-org/react";
import { ICON_SIZE, navButtonBaseProps } from "./constants";

const ToggleThemeButton = () => {
  const togglePalette = () => {};

  return (
    <Button
      {...navButtonBaseProps}
      onPress={togglePalette}
      startContent={<Command size={ICON_SIZE} />}
    />
  );
};

export default ToggleThemeButton;
