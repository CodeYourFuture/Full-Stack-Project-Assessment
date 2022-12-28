const videos = require("../exampleresponse.json");

const idFilter = req => video => video.id === parseInt(req.params.id);

const getVideos = (req, res) => {
  res.send(videos);

}

const getVideo = ((req, res) => {
  const found = videos.some(idFilter(req));

  if (found) {
    res.json(videos.filter(idFilter(req)));
  } else {
    res.status(400).json({ msg: `No video with the id of ${req.params.id}` });
  }
});

const deleteVideo = ((req, res) => {
  const found = videos.some(video => video.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: 'Video deleted',
      video: videos.filter(video => !idFilter(req)(video))
    });
  } else {
    res.status(400).json({ msg: `No video with the id of ${req.params.id}` });
  }
});

const postVideo = (req, res) => {
  const { title, url, rating } = req.body;
  const newVideo = {
    id: videos.length,
    title,
    url,
    rating,
  };
  if (!newVideo.title || !newVideo.url) {
    return res.status(400).json("Please include a title and url");
  }
  videos.push(newVideo);
  res.send(videos)

}

module.exports = {
  postVideo,
  getVideo,
  getVideos,
  deleteVideo

}
