import { FC } from "react";
import { Link } from "react-router-dom";
import { Container } from "@mantine/core";
import CommandButton from "./CommandButton";
import AuthUserMenu from "./AuthUserMenu";
import ThemeButton from "./ThemeButton";

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
          <CommandButton />
          <AuthUserMenu />
        </div>
      </Container>
    </header>
  );
};

export default Header;
