import "./Categories.css";

const Categories = ({ categories }) => {
  return (
    <>
      <div className="categories">
        {categories.map((category, index) => (
          <div key={index} className="categories_cat">
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
