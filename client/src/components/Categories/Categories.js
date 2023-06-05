import "./Categories.css";
import { useState, useEffect, useRef } from "react";

const Categories = ({
  categories,
  setVideos,
  passedCategory,
  setPassedCategory,
  videoPickerRef,
}) => {
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (category.length > 0) {
      fetch(`https://video-server-wtvy.onrender.com/category/${category}`)
        .then((response) => response.json())
        .then((data) => setVideos(data))
        .catch((error) => console.error(error));
    }
  }, [category]);

  const handleCategoryClick = (category) => {
    setCategory(category);
    setPassedCategory(category);
  };

  useEffect(() => {
    if (videoPickerRef.current) {
      videoPickerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [videoPickerRef, passedCategory]);

  return (
    <>
      <div className="categories">
        {categories.map((category, index) => (
          <div
            key={index}
            className="categories_cat"
            onClick={() => handleCategoryClick(category)}
          >
            <div className="overlay"></div>
            <a href="#">{category}</a>
            <img src={`/media/pictures/${category}.webp`} alt="pic" />
          </div>
        ))}
      </div>
      <hr className="main_line"></hr>
    </>
  );
};

export default Categories;
