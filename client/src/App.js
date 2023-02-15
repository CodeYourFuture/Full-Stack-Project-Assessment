import React, { useState } from "react";
import VideoList from "./VideoList";
import VideoAdder from "./VideoAdder";
import ExampleResponse from "./exampleresponse.json";

const App = () => {
  // change the youtube vidoUrl to in a format to be embeded in the app
  const videoUrl = "https://www.youtube.com/embed/";
  const newVideoArray = ExampleResponse.map((video) => {
    const regex = /v=([^&]*)/;
    const match = video.url.match(regex);
    let container = {};
    if (match) {
      const videoId = match[1]; // Extract the video ID from the first group of the match
      const videoLink = videoUrl.concat(videoId);
      container = { ...video, url: videoLink };
    }
    return container;
  });

  //sort the displayed videos descending by ratings
  newVideoArray.sort((a, b) => b.rating - a.rating);

  const [videos, setVideos] = useState(newVideoArray);
  const [isOpen, setIsOpen] = useState(false);

  const onVote = (id, vote) => {
    setVideos(
      videos.map((video) => {
        if (video.id === id) {
          return { ...video, rating: video.rating + vote };
        }
        return video;
      })
    );
  };

  const onRemove = (id) => {
    setVideos(videos.filter((video) => video.id !== id));
  };

  const onAdd = (video) => {
    setVideos([...videos, { ...video, id: videos.length + 1, rating: 0 }]);
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
