import SingleVideo from "./SingleVideo";

const Videos = ({ searchingData, sortedVideoData, setVideoData }) => {
  const handleDelete = (id) => {
    const filteredVideo = sortedVideoData.filter((item) => item.id !== id);
    setVideoData(filteredVideo);
  };

  return (
    <div>
      {searchingData.map((video) => (
        <SingleVideo video={video} key={video.id} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default Videos;
