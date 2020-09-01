import React from "react";
import { graphql } from "gatsby";
import { SIZES } from "../utils/constants";
import { getImageSrc } from "../utils/helpers";
import "./detail.sass";
import Header from "./Header";
export default function Detail({ data: { productDetailType: course } }) {
  return (
    <>
      <Header />
      <section className="detail-page">
        <h1>{course.name}</h1>
        <img
          src={getImageSrc(course.image, SIZES.LARGE)}
          alt={course.imagetext}
        />
        <p>{course.longdescription}</p>
        <p>{course.imagetext} text</p>
      </section>
    </>
  );
}
export const query = graphql`
  query($id: String!) {
    productDetailType(id: { eq: $id }) {
      alcohol
      category
      discount
      id
      image
      name
      price
      longdescription
      soldout
      imagetext
      vegetarian
    }
  }
`;
