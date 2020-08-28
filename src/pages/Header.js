import React from "react";
import hero from "./hero.jpg";

const Header = ({ categories }) => {
  return (
    <header className="header">
      <nav>
        <h1>Petrograd</h1>
        <ul>
          {categories &&
            categories.map((cat) => (
              <li key={cat}>
                <a href={`#${cat}`}>{cat}</a>
              </li>
            ))}
        </ul>
      </nav>

      <img className="hero" src={hero} alt="hero image" />
    </header>
  );
};

export default Header;
