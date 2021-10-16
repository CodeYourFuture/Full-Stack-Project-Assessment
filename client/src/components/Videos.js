import SingleVideo from "./SingleVideo";

const Videos = ({ searchingData, videoData, setVideoData, toggleButton }) => {
  const handleDelete = (id) => {
    const filteredVideo = videoData.filter((item) => item.id !== id);
    setVideoData(filteredVideo);
  };

  return (
    <div>
      <button type="button" class="btn btn-success" onClick={toggleButton}>
        Order Ratings
      </button>
      {searchingData.map((video) => (
        <SingleVideo video={video} key={video.id} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default Videos;
