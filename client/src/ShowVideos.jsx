import ToggleArea from "./ToggleArea";
import VideoInfo from "./VideoInfo";

function ShowVideos({
  toggleArea,
  toggleShow,
  handleOrderChange,
  videos,
  setVideos,
  getAllVideos,
}) {
  return (
    <div>
      <ToggleArea handleOrderChange={handleOrderChange} />
      {videos.length > 0 &&
        videos.map((video) => (
          <VideoInfo
            key={video.id}
            video={video}
            videos={videos}
            setVideos={setVideos}
            getAllVideos={getAllVideos}
          />
        ))}
    </div>
  );
}

export default ShowVideos;
