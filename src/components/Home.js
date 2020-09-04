import React from "react";
import Helmet from "react-helmet";
import Category from "./Category";
import "./index.sass";
import { graphql, useStaticQuery } from "gatsby";
import Header from "./Header";
import city from "../images/city2.svg";

export default function Home() {
  const {
    allCategoryType: { nodes: categories },
  } = useStaticQuery(graphql`
    query {
      allCategoryType {
        nodes {
          name
        }
      }
    }
  `);

  return (
    <>
      <Header />
      <img className="city-skyline" src={city} alt="skyline" />
      <main className="items">
        {categories &&
          categories.map((cat) => (
            <Category key={cat.name} category={cat.name} />
          ))}
      </main>
      <Helmet>
        <title>Petrograd restaurant</title>
      </Helmet>
    </>
  );
}
