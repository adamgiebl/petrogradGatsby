import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import { SIZES } from "../utils/constants";
import { getImageSrc } from "../utils/helpers";
import Vectors from "../utils/vectors";
import "./detail.sass";
import Header from "./Header";
export default function Detail({
  data: { productDetailType: course },
  pageContext,
}) {
  console.log(pageContext);
  return (
    <>
      <Header />
      <section className="detail-page">
        <img
          className="main"
          src={getImageSrc(course.image, SIZES.LARGE)}
          alt={course.imagetext}
        />
        <div className="detail-page__content">
          <h1>{course.name}</h1>
          <p>{course.longdescription || course.shortdescription}</p>
          <hr />
          <div className="detail-page__meta">
            <div className="detail-page__info detail-page__info--top">
              <span>
                {course.allergens}
                {course.allergens.length === 0 && <>no allergens</>}
              </span>
              <span className="place">
                {course.region && (
                  <>
                    {Vectors.place} {course.region}
                  </>
                )}
              </span>
            </div>
            <div className="detail-page__info">
              <span className="vegetarian">
                {course.vegetarian && <>{Vectors.vegetarianSmall} vegetarian</>}
              </span>
              {course.alcohol !== 0 && (
                <span className="alcoholic">alcoholic</span>
              )}
              <span className="price">{course.price},-</span>
            </div>
          </div>
        </div>
      </section>
      <Helmet>
        <title>{course.name}</title>
        <meta
          name="description"
          content={course.longdescription || course.shortdescription}
        />
      </Helmet>
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
      shortdescription
      soldout
      imagetext
      vegetarian
      allergens
      region
    }
  }
`;
