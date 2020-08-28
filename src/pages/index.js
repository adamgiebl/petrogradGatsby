import React, { useEffect, useState } from "react";
import Header from "./Header";
import Category from "./Category";
import { fetchJson } from "../utils/helpers";
import { API } from "../utils/constants";
import "./index.sass";

export default function Home() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchJson(API.CATEGORIES).then((categories) => {
      setCategories(categories);
    });
  }, []);

  return (
    <>
      <Header categories={categories} />
      <main className="items">
        {categories &&
          categories.map((cat) => <Category key={cat} category={cat} />)}
      </main>
    </>
  );
}
