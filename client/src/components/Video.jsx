import React from "react";
import { FaThumbsUp, FaThumbsDown, FaTrash } from "react-icons/fa";

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
    <div className="bg-white rounded-lg p-4 ">
      <div className="relative" style={{ paddingBottom: "56.25%", height: 0 }}>
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-xl font-medium">{video.title}</h2>
          </div>
        </div>
        <iframe
          title={video.title}
          className="top-0 left-0 w-320 h-220"
          src={video.url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="mt-5 flex justify-between items-center">
        <div className="flex items-center">
          <button
            type="button"
            className="text-sm font-medium text-green-700 p-2 rounded-full border border-gray-500"
            onClick={handleUpVote}
          >
            <FaThumbsUp />
          </button>
          <div className="text-sm font-medium text-gray-500 ml-2 mr-2">
            {video.rating}
          </div>
          <button
            type="button"
            className="text-sm font-medium text-amber-600 p-2 rounded-full border border-gray-500"
            onClick={handleDownVote}
          >
            <FaThumbsDown />
          </button>
        </div>
        <button
          type="button"
          className="text-sm font-medium text-red-700 p-2  rounded-full border border-gray-500"
          onClick={() => onRemove(video.id)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default Video;
