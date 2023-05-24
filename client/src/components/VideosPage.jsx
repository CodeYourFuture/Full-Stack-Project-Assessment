import VideoCard from "./VideoCard";
import Loading from "./Loading";
import Error from "./Error";

export default function VideosContainer({
  videos,
  isLoading,
  isError,
  errorMessage,
  setRefreshVideos,
}) {
  return (
    <div className="video-page-container">
      {isLoading && <Loading />}
      {isError && <Error errorMessage={errorMessage} />}
      {!isLoading &&
        !isError &&
        Boolean(videos) &&
        videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            setRefreshVideos={setRefreshVideos}
          />
        ))}
    </div>
  );
}
