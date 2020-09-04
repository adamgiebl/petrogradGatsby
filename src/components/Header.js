import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
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
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>Petrograd</h1>
        </Link>
        <ul>
          {categories &&
            categories.map((cat) => (
              <li key={cat.name}>
                <Link to={`/#${cat.name}`}>{cat.name}</Link>
              </li>
            ))}
        </ul>
      </nav>

      {/*<img className="hero" src={hero} alt="hero" />*/}
    </header>
  );
};

export default Header;
