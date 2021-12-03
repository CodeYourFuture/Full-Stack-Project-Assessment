import React from 'react'

const Video = ({ videos, setVideos, video, index }) => {
  const urlId = video.url.slice(32);
  const formatTitle = (title) => {
    const length = title.length;
    const firstTwenty = title.slice(0, 25);
    const formattedTitle = length > 25 ? `${firstTwenty}...` : title;
    return formattedTitle;
  }
  const handleDelete = () => {
    const videosExceptDeletedVideo = videos.slice(0, index).concat(videos.slice(index + 1));
    setVideos(videosExceptDeletedVideo);
  }
    return (
      <div className="p-4">
        <h4>{formatTitle(video.title)}</h4>
        <div>
          <h5>Rating: {video.rating}</h5>
        </div>
        <div>
          <iframe
            height="250px"
            className="vid"
            src={`https://www.youtube.com/embed/${urlId}`}
            allowFullScreen
            title={video.title}
          ></iframe>
        </div>
        <div>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    );
}

export default Video
