import React from "react";
import Category from "./Category";
import "./index.sass";
import { graphql, useStaticQuery } from "gatsby";

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
      <main className="items">
        {categories &&
          categories.map((cat) => (
            <Category key={cat.name} category={cat.name} />
          ))}
      </main>
    </>
  );
}
