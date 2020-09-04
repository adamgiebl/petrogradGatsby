import React from "react";
import { SIZES } from "../utils/constants";
import { getImageSrc } from "../utils/helpers";
import { graphql, useStaticQuery, Link } from "gatsby";
import Vectors from "../utils/vectors";

const Category = ({ category }) => {
  const {
    allProductType: { nodes: courses },
  } = useStaticQuery(graphql`
    query {
      allProductType {
        nodes {
          id
          image
          name
          price
          vegetarian
          soldout
          category
        }
      }
    }
  `);
  return (
    <section id={category}>
      <h2>{category}</h2>
      <div className="container">
        {courses &&
          courses
            .filter((c) => c.category === category)
            .map((course) => (
              <Link to={`/${course.image}`} key={course.id}>
                <article className="course">
                  {Vectors.table}
                  <div className="course__plate">{Vectors.plate}</div>
                  <img
                    className="course__image"
                    src={getImageSrc(course.image, SIZES.MEDIUM)}
                    alt={course.name}
                  />
                  <div className="course__name">{course.name}</div>
                  {course.soldout && (
                    <div className="course__sold-out">
                      <span>Sold out</span>
                    </div>
                  )}
                  <div className="course__footer">
                    {course.vegetarian && Vectors.vegetarianSmall}
                    <span className="course__price">{course.price},-</span>
                  </div>
                </article>
              </Link>
            ))}
      </div>
    </section>
  );
};

export default Category;
