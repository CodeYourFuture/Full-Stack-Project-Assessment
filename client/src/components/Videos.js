import SingleVideo from "./SingleVideo";

const Videos = ({
  searchingData,
  sortedVideoData,
  setVideoData,
  handleSort,
}) => {
  const handleDelete = (id) => {
    const filteredVideo = sortedVideoData.filter((item) => item.id !== id);
    setVideoData(filteredVideo);
  };

  return (
    <div>
      <button type="button" class="btn btn-success" onClick={handleSort}>
        Sort Ratings
      </button>
      {searchingData.map((video) => (
        <SingleVideo video={video} key={video.id} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default Videos;
