import "./VideoPicker.css";
import ReactSelect from "react-select";
import { useEffect, useState } from "react";
import VideoCard from "../VideoCard/VideoCard";

const VideoPicker = ({
  categories,
  videos,
  setOrder,
  setVideos,
  passedCategory,
  videoPickerRef,
  fetchVideos,
}) => {
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
  const [category, setCategory] = useState("");

  useEffect(() => {
    setVideoList(videos);
  }, [videos]);

  useEffect(() => {
    if (passedCategory.length > 0) {
      const newCategory = {
        value: passedCategory,
        label: passedCategory,
      };
      console.log("new category is: ");
      console.log(newCategory);
      setSelectedCategory(newCategory);
    }
  }, [passedCategory]);

  useEffect(() => {
    if (category.length > 0) {
      fetch(`https://video-server-wtvy.onrender.com/category/${category}`)
        .then((response) => response.json())
        .then((data) => {
          setVideos(data);
        })
        .catch((error) => console.error(error));
    }
  }, [category, setVideos]);

  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    setCategory(selectedCategory.value);
    console.log(selectedCategory);
    console.log(selectedCategory.value);
  };

  const handleOrderChange = (selectedOrder) => {
    setSelectedOrder(selectedOrder);

    console.log(selectedOrder.value);
    selectedOrder.value.includes("Most") ? setOrder("desc") : setOrder("asc");
  };

  return (
    <>
      <div ref={videoPickerRef}></div>
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
          {videos.length > 0 ? (
            videoList.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                fetchVideos={fetchVideos}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default VideoPicker;
