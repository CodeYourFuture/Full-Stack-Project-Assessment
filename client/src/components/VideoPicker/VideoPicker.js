import "./VideoPicker.css";
import ReactSelect from "react-select";
import { useState } from "react";
import VideoCard from "../VideoCard/VideoCard";
import videos from "../../exampleresponse.json";

const VideoPicker = ({ categories }) => {
  let categoryOptions = [];

  //adding values to the options array
  categories.forEach((category) => {
    const newOption = {};
    newOption.value = category;
    newOption.label = category;
    categoryOptions.push(newOption);
  });
  const orderOptions = [
    { value: "Ascending", label: "Ascending" },
    { value: "Descending", label: "Descending" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]);
  const [selectedOrder, setSelectedOrder] = useState(orderOptions[0]);

  console.log(videos);

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
        <div className="selector_field">
          <ReactSelect
            options={categoryOptions}
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="custom_select"
            isSearchable={false}
          />
        </div>
        <div className="selector_field">
          <ReactSelect
            options={orderOptions}
            value={selectedOrder}
            onChange={handleOrderChange}
            className="custom_select"
            isSearchable={false}
          />
        </div>
      </div>
      <div className="video_cards">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoPicker;
