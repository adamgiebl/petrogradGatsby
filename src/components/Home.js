import React, { useState, useEffect } from "react";
import Category from "./Category";
import { Link } from "gatsby";
import "./index.sass";
import { fetchJson } from "../utils/helpers";
import { API } from "../utils/constants";

export default function Home() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchJson(API.CATEGORIES).then((categories) => {
      setCategories(categories);
    });
  }, []);
  return (
    <>
      <Link to="/detail/1">First item</Link>
      <main className="items">
        {categories &&
          categories.map((cat) => <Category key={cat} category={cat} />)}
      </main>
    </>
  );
}
