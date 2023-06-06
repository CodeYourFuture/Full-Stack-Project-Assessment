import "./VideoPicker.css";
import ReactSelect from "react-select";
import { useEffect, useState } from "react";
import VideoCard from "../VideoCard/VideoCard";

const VideoPicker = ({
  categories,
  videos,
  order,
  setOrder,
  setVideos,
  passedCategory,
  videoPickerRef,
}) => {
  // Create category options
  const categoryOptions = [
    { value: "All videos", label: "All videos" },
    ...categories.map((category) => ({ value: category, label: category })),
  ];

  const orderOptions = [
    { value: "Most Popular", label: "Most Popular" },
    { value: "Least Popular", label: "Least Popular" },
  ];
  const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]);
  const [selectedOrder, setSelectedOrder] = useState(orderOptions[0]);
  const [videoList, setVideoList] = useState(videos);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Update selected category when passedCategory prop changes
  useEffect(() => {
    if (passedCategory.length > 0) {
      const newCategory = {
        value: passedCategory,
        label: passedCategory,
      };
      setSelectedCategory(newCategory);
    }
  }, [passedCategory]);

  // Fetch videos based on category and order
  useEffect(() => {
    if (category.length > 0) {
      setIsLoading(true);
      fetch(
        `https://video-server-wtvy.onrender.com/category/${category}?order=${order}`
      )
        .then((response) => response.json())
        .then((data) => {
          setVideos(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  }, [category, order, setVideos]);

  // Update video list when videos prop changes
  useEffect(() => {
    if (Array.isArray(videos)) {
      setVideoList(videos);
    } else {
      setVideoList([]);
    }
  }, [videos]);

  // Handle category change
  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    setCategory(selectedCategory.value);
  };

  // Handle order change
  const handleOrderChange = (selectedOrder) => {
    setSelectedOrder(selectedOrder);
    selectedOrder.value.includes("Most") ? setOrder("desc") : setOrder("asc");
  };

  // Update video rating
  const updateVideoRating = (videoId, rating) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoId ? { ...video, rating } : video
      )
    );
  };

  // Delete video
  const deleteVideo = (videoId) => {
    setVideos((prevVideos) =>
      prevVideos.filter((video) => video.id !== videoId)
    );
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
          {isLoading ? (
            <p className="info_msg">Loading...</p>
          ) : videos.length > 0 ? (
            videoList.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                updateVideoRating={updateVideoRating}
                deleteVideo={deleteVideo}
              />
            ))
          ) : (
            <p className="info_msg">
              No videos found for the specified category.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default VideoPicker;
