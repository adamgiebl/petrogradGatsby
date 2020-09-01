import React from "react";
import hero from "../images/hero.jpg";
import { graphql, useStaticQuery } from "gatsby";
const Header = () => {
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
    <header className="header">
      <nav>
        <h1>Petrograd</h1>
        <ul>
          {categories &&
            categories.map((cat) => (
              <li key={cat.name}>
                <a href={`/#${cat.name}`}>{cat.name}</a>
              </li>
            ))}
        </ul>
      </nav>

      <img className="hero" src={hero} alt="hero" />
    </header>
  );
};

export default Header;
