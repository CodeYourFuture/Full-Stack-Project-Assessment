import Video from "./Video";
const VideoLists = ({ allVideos, getAllVideos }) => {
  return (
    <div className="video-lists">
      {allVideos.map((video) => (
        <Video
          key={video.id}
          id={video.id}
          rating={video.rating}
          title={video.title}
          url={video.url}
          getAllVideos={getAllVideos}
        />
      ))}
    </div>
  );
};

export default VideoLists;
