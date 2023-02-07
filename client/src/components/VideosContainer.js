import Video from "./Video";

export default function VideosContainer({ videos }) {
  return (
    <div className="container-videos">
      {videos.map(video => (
        <Video key={video.id} video={video} />
      ))}
    </div>
  );
}