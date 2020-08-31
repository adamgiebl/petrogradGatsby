import React, { useState, useEffect } from "react";
import hero from "../images/hero.jpg";
import { fetchJson } from "../utils/helpers";
import { API } from "../utils/constants";
const Header = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchJson(API.CATEGORIES).then((categories) => {
      setCategories(categories);
    });
  }, []);
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

      <img className="hero" src={hero} alt="hero" />
    </header>
  );
};

export default Header;
