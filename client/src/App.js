import React, { useState } from "react";
import VideoList from "./VideoList";
import VideoAdder from "./VideoAdder";

const App = () => {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Video 1",
      url: "https://www.youtube.com/embed/FHTbsZEJspU",
      votes: 0,
    },
    {
      id: 2,
      title: "Video 2",
      url: "https://www.youtube.com/embed/2",
      votes: 0,
    },
    {
      id: 3,
      title: "Video 3",
      url: "https://www.youtube.com/embed/3",
      votes: 0,
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const onVote = (id, vote) => {
    setVideos(
      videos.map((video) => {
        if (video.id === id) {
          return { ...video, votes: video.votes + vote };
        }
        return video;
      })
    );
  };

  const onRemove = (id) => {
    setVideos(videos.filter((video) => video.id !== id));
  };

  const onAdd = (video) => {
    setVideos([...videos, { ...video, id: videos.length + 1, votes: 0 }]);
    setIsOpen(false);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center">
      <VideoAdder
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onAdd={onAdd}
        onClose={onClose}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsOpen(true)}
      >
        Add Video
      </button>
      <div className="flex flex-wrap">
        <VideoList videos={videos} onVote={onVote} onRemove={onRemove} />
      </div>
    </div>
  );
};

export default App;
