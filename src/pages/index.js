import React from "react";
import { Router } from "@reach/router";
import Home from "../components/Home";
import Header from "../components/Header";
import Detail from "../pages/app/detail";

const App = () => {
  return (
    <>
      <Header />
      <Router>
        <Home path="/" />
        <Detail path="/app/detail/:id" />
      </Router>
    </>
  );
};

export default App;
