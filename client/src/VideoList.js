import Video from "./Video";

const VideoList = ({ videos, onUpVote, onDownVote, onRemove }) => {
  return (
    <>
      {videos.map((video) => (
        <Video
          key={video.id}
          title={video.title}
          url={video.url}
          votes={video.votes}
          onUpVote={() => onUpVote(video.id)}
          onDownVote={() => onDownVote(video.id)}
          onRemove={() => onRemove(video.id)}
        />
      ))}
    </>
  );
};

export default VideoList;
