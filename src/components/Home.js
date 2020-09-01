import React from "react";
import Category from "./Category";
import "./index.sass";
import { graphql, useStaticQuery } from "gatsby";
import Header from "./Header";

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
      <main className="items">
        {categories &&
          categories.map((cat) => (
            <Category key={cat.name} category={cat.name} />
          ))}
      </main>
    </>
  );
}
