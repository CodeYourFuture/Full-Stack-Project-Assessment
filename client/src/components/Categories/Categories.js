import "./Categories.css";
import { useState, useEffect } from "react";

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
      // Fetch videos for the selected category
      fetch(`https://video-server-wtvy.onrender.com/category/${category}`)
        .then((response) => response.json())
        .then((data) => setVideos(data))
        .catch((error) => console.error(error));
    }
  }, [category]);

  const handleCategoryClick = (clickedCategory) => {
    setCategory(clickedCategory);
    setPassedCategory(clickedCategory);
  };

  useEffect(() => {
    if (videoPickerRef.current) {
      // Scroll to the video picker section when category changes
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
            <h2>{category}</h2>
            <img src={`/media/pictures/${category}.webp`} alt="pic" />
          </div>
        ))}
      </div>
      <hr className="main_line"></hr>
    </>
  );
};

export default Categories;
