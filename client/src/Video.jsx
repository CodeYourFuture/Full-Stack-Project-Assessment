// Video.js
import React from "react";

const Video = ({ video, onVote, onRemove }) => {
  const handleUpVote = () => {
    onVote(video.id, 1);
  };

  const handleDownVote = () => {
    if (video.rating > 0) {
      onVote(video.id, -1);
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg p-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium">{video.title}</h2>
        <button
          type="button"
          className="text-xs font-medium bg-red-500 text-white p-2 rounded-full"
          onClick={() => onRemove(video.id)}
        >
          Remove
        </button>
      </div>
      <div className="mt-4">
        <iframe
          title={video.title}
          width="560"
          height="315"
          src={video.url}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="mt-4 flex justify-between">
        <button
          type="button"
          className="text-xs font-medium bg-green-500 text-white p-2 rounded-full"
          onClick={handleUpVote}
        >
          Up Vote
        </button>
        <div className="text-xs font-medium">{video.rating}</div>
        <button
          type="button"
          className="text-xs font-medium bg-red-500 text-white p-2 rounded-full"
          onClick={handleDownVote}
        >
          Down Vote
        </button>
      </div>
    </div>
  );
};

export default Video;
