import { Button } from "@nextui-org/react";

export const ICON_SIZE = 18;

export const navButtonBaseProps: React.ComponentProps<typeof Button> = {
  variant: "ghost",
  className: "w-10 h-10",
  radius: "full",
  isIconOnly: true,
};
