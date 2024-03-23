import React from "react";
import { styled } from "@mui/material";
import { NavigationBar } from "../components/NavigationBar";
import PureProxyManager from "../components/PureProxyManager";

export const StyledText = styled("div")(() => ({
  color: "white",
  fontSize: 18,
  fontWeight: 500,
  lineHeight: 1.5,
  marginBottom: 20,
}));

const Home = () => {
  return (
    <div>
      <NavigationBar />
      <PureProxyManager />
    </div>
  );
};

export default Home;
