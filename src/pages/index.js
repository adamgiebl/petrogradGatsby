import React, { useEffect, useState } from "react";
import { Router } from "@reach/router";
import Home from "../components/Home";
import Header from "../components/Header";
import { fetchJson } from "../utils/helpers";
import { API } from "../utils/constants";

const SomeSubPage = (props) => {
  return <div>Hi from SubPage with id: {props.id}</div>;
};

const App = () => {
  return (
    <>
      <Header />
      <Router>
        <Home path="/" />
        <SomeSubPage path="/detail/:id" />
      </Router>
    </>
  );
};

export default App;
