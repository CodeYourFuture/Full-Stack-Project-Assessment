import React from "react";
import "./videoTable.css"
import "bootstrap/dist/css/bootstrap.min.css";

function convertWatchToEmbedLink(watchLink) {
  const watchPattern = /https:\/\/www\.youtube\.com\/watch\?v=([A-Za-z0-9_-]+)/;
  const match = watchLink.match(watchPattern);

  if (match && match.length === 2) {
    const videoId = match[1];
    const embedLink = `https://www.youtube.com/embed/${videoId}`;
    return embedLink;
  } else {
    return watchLink;
  }
}

const VideoTable = ({ videos, handleVote, handleRemove }) => {
  return (
    <div className="container">
      <div className="row">
        {videos.map((video) => (
          <div className="col-md-3 mb-4" key={video.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{video.title}</h5>
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    className="embed-responsive-item"
                    src={
                      video.url.startsWith("https://www.youtube.com/watch?v=")
                        ? convertWatchToEmbedLink(video.url)
                        : video.url
                    }
                    title={video.title}
                    allowFullScreen
                  />
                </div>
                <p className="card-text">Uploaded: {video.uploadDate}</p>
                {/* Add Rating component here */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoTable;
