import Video from "./Video";

export default function VideosContainer({ videos, deleteVideo, incRating, decRating }) {
  return (
    <div className="container-videos">
      {videos.map(video => (
        <Video key={video.id} video={video} deleteVideo={deleteVideo} incRating={incRating} decRating={decRating} />
      ))}
    </div>
  );
}