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
    try {
      const videoIsNew = await videoDoesntExist(vData.url);
      if (videoIsNew) {
        const newVideo = buildNewVideoData(vData);
        await repository.addNewVideo(newVideo);
        return {
          status: "OK",
          value: { id: newVideo.id },
          message:"Video has been added successfully."
        };
      }
      return {
        status: "FAIL",
        value:null,
        message:
          "Video with the same url already exists and could not be saved.",
      };
    } catch (error) {
      // if there is database connection issue
      return console.log(error);
    }
  }
  return {
    status: "FAIL",
    value:null,
    message: "Video could not be saved. Missing video title or url.",
  };
}

// validate incoming video data
async function validateVideoData(vData) {
  return vData.title && vData.url && (await videoDoesntExist(vData.url));
}

// check existence of a video before posting
async function videoDoesntExist(vUrl) {
  try {
    const result = await repository.getVideoByUrl(vUrl);
    return result.rowCount === 0;
  } catch (error) {
    console.log(error);
  }
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
    await repository.deleteVideoById(vId);
    return true;
  } catch (error) {
    // if there is database connection issue
    console.log(error);
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
