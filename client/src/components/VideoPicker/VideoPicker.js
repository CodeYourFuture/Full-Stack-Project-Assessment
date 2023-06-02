import "./VideoPicker.css";
import ReactSelect from "react-select";
import { useEffect, useState } from "react";
import VideoCard from "../VideoCard/VideoCard";
import videos from "../../exampleresponse.json";

const VideoPicker = ({ categories }) => {
  let categoryOptions = [];

  //adding one value to the options array
  categoryOptions.push({ value: "All videos", label: "All videos" });
  //adding values to the options array
  categories.forEach((category) => {
    const newOption = {};
    newOption.value = category;
    newOption.label = category;
    categoryOptions.push(newOption);
  });
  const orderOptions = [
    { value: "Most Popular", label: "Most Popular" },
    { value: "Least Popular", label: "Least Popular" },
  ];
  const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]);
  const [selectedOrder, setSelectedOrder] = useState(orderOptions[0]);
  const [videoList, setVideoList] = useState(videos);

  console.log(videoList);

  useEffect(() => {
    const sortedVideos = [...videos]; // Create a copy of the videos array
    sortedVideos.sort((a, b) => b.rating - a.rating); // Sort the copied array
    setVideoList(sortedVideos); // Set the sorted array as the videoList state
  }, []);

  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  const handleOrderChange = (selectedOrder) => {
    setSelectedOrder(selectedOrder);

    if (selectedOrder.value === "Most Popular") {
      videoList.sort((a, b) => b.rating - a.rating);
    } else {
      videoList.sort((a, b) => a.rating - b.rating);
    }

    setVideoList([...videoList]); // Trigger re-render by updating the videoList state
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
        {videoList.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoPicker;
