import SingleVideo from "./SingleVideo";

const Videos = ({ searchingData, videoData, setVideoData }) => {
  const handleDelete = (id) => {
    const filteredVideo = videoData.filter((item) => item.id !== id);
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
