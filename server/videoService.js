const { json } = require("express");
const { Videos } = require("./videoModel");

function getVideos(id) {
    if(id) { return Videos.find({id})}

    return Videos.find();
}

async function addVideo(videoObj) {
    const id = new Date().getTime();
    const vidObj = new Videos({
        id,
        title: videoObj.title,
        url: videoObj.url,
        rating: 0
        }
    );

    return await vidObj.save((err, vidObj) => {
        if(err) return 'Failed to Save';

        console.log(vidObj._id);
        return vidObj.id;
    });
}

function deleteVideo(id) {
  return Videos.find({id})
    .then(result => {
        if(result.length) {
            console.log(JSON.stringify(result))
            return Videos.deleteOne({id: id});
        } else {
            return {
                result: "failure",
                message: "Video could not be deleted because it does not exist",
            };  
        }
    });
}

module.exports = { getVideos, addVideo, deleteVideo };