import VideoComponent from "./VideoComponent";

function VideosList({ videos, createVideoPlayer, handleDelete }) {
  return (
    <>
      <div className='videos-container grid grid-flow-row auto-rows-max grid-cols-2 gap-4 auto-cols-max'>
        {videos.map((video) => (
          <VideoComponent
            key={video.id}
            id={video.id}
            title={video.title}
            URL={video.url}
            votes={video.rating}
            createVideoPlayer={createVideoPlayer}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
}

export default VideosList;
