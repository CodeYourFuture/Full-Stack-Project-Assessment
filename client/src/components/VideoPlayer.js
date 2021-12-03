import VoteComponent from "./VoteComponent";

const VideoPlayer = ({ videos, setVideos }) => {
  const handleDelete = (id) => {
    const deletedItem = videos.filter((video) => video.id !== id);
    console.log("deletedItem,:", deletedItem);
    setVideos(deletedItem);
  };

  return (
    <div className="display-container">
      {videos.map((video) => {
        console.log(video.url.slice(32));
        return (
          <div key={video.id}>
            <p className="title">{video.title}</p>
            <iframe
              className="video-card"
              width="25rem"
              height="40rem"
              src={`https://www.youtube.com/embed/${video.url.slice(32)}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <VoteComponent />
            <div>
              <button
                onClick={() => handleDelete(video.id)}
                type="button"
                class="btn btn-danger p-1 m-3"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VideoPlayer;
