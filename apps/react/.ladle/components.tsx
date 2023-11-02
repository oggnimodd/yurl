import React, { useLayoutEffect } from "react";
import type { GlobalProvider } from "@ladle/react";
import AppProvider from "../src/Provider";

import "@mantine/core/styles.css";
import "../src/styles/index.css";
import "./ladle.css";

export const Provider: GlobalProvider = ({ children, globalState }) => {
  const theme = globalState.theme;

  useLayoutEffect(() => {
    const body = document.body;
    const html = document.querySelector("html");

    if (theme === "dark") {
      body.classList.remove("light");
      body.classList.add("dark");

      html?.setAttribute("data-mantine-color-scheme", "dark");
    } else if (theme === "light") {
      body.classList.remove("dark");
      body.classList.add("light");

      html?.setAttribute("data-mantine-color-scheme", "light");
    }
  }, [theme]);

  return (
    <div className={theme}>
      <AppProvider>{children}</AppProvider>
    </div>
  );
};
