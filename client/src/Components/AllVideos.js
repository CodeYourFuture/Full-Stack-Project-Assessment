import VideoCard from "./VideoCard";

const AllVideos = ({ videos, setVideos }) => {
  const removeVideo = (video) =>
    setVideos(videos.filter((oneVideo) => oneVideo !== video));
  return (
    <div>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} removeVideo={removeVideo} />
      ))}
    </div>
  );
};

export default AllVideos;
