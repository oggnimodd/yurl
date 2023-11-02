import React, { FC } from "react";
import { Header } from "components";
import { Container } from "@mantine/core";

interface CommonLayoutProps {
  children: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
};

export default CommonLayout;
