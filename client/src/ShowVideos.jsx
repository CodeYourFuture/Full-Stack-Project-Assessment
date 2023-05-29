import ToggleArea from "./ToggleArea";
import VideoInfo from "./VideoInfo";

function ShowVideos({
  handleOrderChange,
  videos,
  setVideos,
  getAllVideos,
  //   order,
}) {
  return (
    <div>
      <ToggleArea handleOrderChange={handleOrderChange} />
      <section className="video-grid">
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
      </section>
    </div>
  );
}

export default ShowVideos;
