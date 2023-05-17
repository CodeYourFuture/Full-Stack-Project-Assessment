import VideoItem from "./VideoItem";

const VideoList = ({ videos, onRemove, onVote }) => {
     const handleVote = (id, increment) => {
       onVote(id, increment);
     };
  return (
    <div className="video-list">
      {videos.map((video) => (
        <VideoItem
          key={video.id}
          video={video}
          onRemove={onRemove}
          onVote={handleVote}
        />
      ))}
    </div>
  );
};
export default VideoList;
