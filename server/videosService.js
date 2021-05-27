const youTubeVideos = require("../exampleresponse.json");
const videos = [...youTubeVideos];

// validate incoming video data
function validateVideoData(vData) {
  return vData.title && vData.url;
}

// construct a video data model to be sent to the client
function buildNewVideoData(vData) {
  return {
    id: Math.floor(Math.random(0, 1) * 1000000),
    title: vData.title,
    url: vData.url,
    rating: 0,
  };
}

//
function addNewVideo(vData) {
  const dataIsValid = validateVideoData(vData);
  if (dataIsValid) {
    const newVideo = buildNewVideoData(vData);
    videos.push(newVideo);
    return { id: newVideo.id };
  }
  return {
    result: "failure",
    message: "Video could not be saved",
  };
}

// search/find a video
function getVideoById(vId) {
  return videos.find((v) => v.id === Number(vId));
}

// find video index
function findVideo(vId) {
  const video = getVideoById(vId);
  if (videos.indexOf(video !== -1)) {
    return true;
  }
  return false;
}

// update user rating of a video
function updateVideoRating(vId, plusOrMinus) {
  const videoToUpdate = getVideoById(vId);
  console.log(videoToUpdate.rating);
  const rating = videoToUpdate.rating;
  plusOrMinus === "plus"
    ? (videoToUpdate.rating = rating + 1)
    : (videoToUpdate.rating = rating - 1);
}

// sort videos
function sortVideosByRating(videos, sortOrder) {
  const sortedVideos = videos.sort((video1, video2) => {
    switch (sortOrder) {
      case "asc":
        if (video1.rating < video2.rating) {
          return -1;
        } else if (video1.rating > video2.rating) {
          return 1;
        }
        return 0;
      case "desc":
      default:
        if (video1.rating < video2.rating) {
          return 1;
        } else if (video1.rating > video2.rating) {
          return -1;
        }
        return 0;
    }
  });
  return sortedVideos;
}

// remove video from list
function deleteVideoById(vId) {
  const index = videos.findIndex((v) => v.id === Number(vId));
  if (index !== -1) {
    videos.splice(index, 1);
    return true;
  }
  return false;
}

module.exports = {
  validateVideoData,
  buildNewVideoData,
  sortVideosByRating,
  addNewVideo,
  findVideo,
  getVideoById,
  updateVideoRating,
  deleteVideoById,
};
