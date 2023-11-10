import React, { FC } from "react";
import { Header, CommandPalette } from "components";
import { Container } from "@mantine/core";

interface CommonLayoutProps {
  children: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <CommandPalette />
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
};

export default CommonLayout;
