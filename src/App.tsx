import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Web3ConnectedContextProvider } from "./context/Web3ConnectedContext";
import Home from "./page/Home";
import { theme } from "./styles/theme";
import { ThemeProvider } from "@mui/material";

function App() {
  return (
    <Web3ConnectedContextProvider>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </Web3ConnectedContextProvider>
  );
}

export default App;
