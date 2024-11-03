import { render, RenderOptions } from "@testing-library/react";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

const theme = createTheme();
const testRender = (
  Component: React.ReactElement,
  options: RenderOptions = {}
) => {
  function Wrapper({ children }) {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main">
          <CssBaseline />
          {children}
        </Container>
      </ThemeProvider>
    );
  }

  return render(Component, { wrapper: Wrapper, ...options });
};

export default testRender;
