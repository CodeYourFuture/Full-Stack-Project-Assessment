import "./Header.css";
import { useEffect, useState } from "react";

const Header = ({ categories }) => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategoryIndex(
        (prevIndex) => (prevIndex + 1) % categories.length
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [categories.length]);

  return (
    <header>
      <div className="header">
        <div className="header-container">
          <img src="/media/icons/logo_lens.svg" alt="logo lens" />
          <h1>VideoVortex</h1>
        </div>
        <div className="header_categories_container">
          {categories.map((category, index) => (
            <span
              key={category}
              className={`category_animation ${
                index === currentCategoryIndex ? "fade-in" : "fade-out"
              }`}
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <hr className="header_line"></hr>
    </header>
  );
};

export default Header;
