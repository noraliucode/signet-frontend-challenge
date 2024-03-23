import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Web3ConnectedContextProvider } from "./context/Web3ConnectedContext";

function App() {
  return (
    <Web3ConnectedContextProvider>
      <div className="App">test</div>
    </Web3ConnectedContextProvider>
  );
}

export default App;
