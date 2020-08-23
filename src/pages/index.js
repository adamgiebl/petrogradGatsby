import React, { useEffect, useState } from "react";
import "./index.sass";

const ALL_COURSES = "https://kea-alt-del.dk/t5/api/productlist";
const IMAGE_BASE = "https://kea-alt-del.dk/t5/site/imgs";

export default function Home() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch(ALL_COURSES)
      .then((res) => res.json())
      .then((res) => {
        console.log(res[2]);
        setCourses(res);
      });
  }, []);

  const getImageSrc = (imgName) => {
    return IMAGE_BASE + "/small/" + imgName + "-sm.jpg";
  };

  return (
    <div>
      <header className="header">
        <h1>Petrograd</h1>
      </header>
      <main className="items">
        {courses &&
          courses.map((course) => (
            <article key={course.id}>
              <img src={getImageSrc(course.image)} alt="" /> {course.name}
            </article>
          ))}
      </main>
    </div>
  );
}

