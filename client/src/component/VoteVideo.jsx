export const increasementVote = (setVideosYoutube, videosYoutube, id) => {
    setVideosYoutube(videosYoutube.map(video => video.id !== id ? video : { ...video, rating: video.rating + 1 }));
  };
  
  export const decreasementVote = (setVideosYoutube, videosYoutube, id) => {
    setVideosYoutube(videosYoutube.map(video => video.id !== id ? video : { ...video, rating: video.rating - 1 }));
  };
  
  export const deleteVideo = (setVideosYoutube, id) => {
    setVideosYoutube((videos) => videos.filter((video) => video.id !== id));
  };