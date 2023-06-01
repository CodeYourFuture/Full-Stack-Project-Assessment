import "./VideoPicker.css";
import ReactSelect from "react-select";
import { useState } from "react";

const VideoPicker = ({ categories }) => {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isOrderMenuOpen, setIsOrderMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const orderOptions = [
    { value: "Ascending", label: "Ascending" },
    { value: "Descending", label: "Descending" },
  ];
  let categoryOptions = [];

  //adding values to the options array
  categories.forEach((category) => {
    const newOption = {};
    newOption.value = category;
    newOption.label = category;
    categoryOptions.push(newOption);
  });

  const toggleCategoryMenu = () => {
    setIsCategoryMenuOpen(!isCategoryMenuOpen);
  };

  const toggleOrderMenu = () => {
    setIsOrderMenuOpen(!isOrderMenuOpen);
  };

  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  const handleOrderChange = (selectedOrder) => {
    setSelectedOrder(selectedOrder);
  };

  return (
    <div className="video_picker">
      <h1>Watch videos</h1>
      <div className="selectors">
        <div className="selector_field" onClick={toggleCategoryMenu}>
          <ReactSelect
            options={categoryOptions}
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="custom_select"
            isSearchable={false}
            menuIsOpen={isCategoryMenuOpen} // Set the menu visibility based on isMenuOpen state
          />
        </div>
        <div className="selector_field" onClick={toggleOrderMenu}>
          <ReactSelect
            options={orderOptions}
            value={selectedOrder}
            onChange={handleOrderChange}
            className="custom_select"
            isSearchable={false}
            menuIsOpen={isOrderMenuOpen} // Set the menu visibility based on isMenuOpen state
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPicker;
