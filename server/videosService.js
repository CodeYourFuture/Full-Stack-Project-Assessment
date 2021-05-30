const repository = require("./videosRepository");

// get all videos, sorted by rating
async function getAllVideos(sortOrder) {
  !sortOrder || sortOrder === "desc"
    ? (sortOrder = "DESC")
    : (sortOrder = "ASC");
  return await repository.getAllVideos(sortOrder);
}

// add video to list
async function addNewVideo(vData) {
  const dataIsValid = validateVideoData(vData);
  if (dataIsValid) {
    const newVideo = buildNewVideoData(vData);
    try {
      await repository.addNewVideo(newVideo);
      return true;
    } catch (error) {
      // if there is database connection issue
      console.log(error);
    }
  }
  return false;
}

// validate incoming video data
function validateVideoData(vData) {
  return vData.title && vData.url;
}

// update user rating of a video
async function updateVideoRating(vId, vRating) {
  try {
    return await repository.updateVideoRating(vId, vRating);
  } catch (error) {
    // if there is database connection issue
    console.log(error);
  }
}

// search/find a video from list
async function getVideoById(vId) {
  try {
    const result = await repository.getVideoById(vId);
    return result.rows;
  } catch (error) {
    // if there is database connection issue
    console.log(error);
  }
}

// remove video from list
async function deleteVideoById(vId) {
  try {
    const result = await repository.deleteVideoById(vId);
    return true;
  } catch (error) {
    // if there is database connection issue
    console.log(result);
    return false;
  }
}

// construct a video model data to be sent to the client
function buildNewVideoData(vData) {
  return {
    id: Math.floor(Math.random(0, 1) * 1000000),
    title: vData.title,
    url: vData.url,
  };
}

module.exports = {
  validateVideoData,
  buildNewVideoData,
  getAllVideos,
  addNewVideo,
  getVideoById,
  updateVideoRating,
  deleteVideoById,
};
