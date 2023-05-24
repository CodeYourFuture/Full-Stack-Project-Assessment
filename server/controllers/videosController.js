const database = require("../database/databaseConnection");

const getAllVideos = async (req, res) => {
  try {
    const order = req.query.order;
    if (!order) {
      const queryAllVideos = await database.query(`
        SELECT *
          FROM videos
          ORDER BY id;`);
      return res
        .status(200)
        .json({ success: true, error: false, payload: queryAllVideos.rows });
    }

    // /videos?order=asc && /videos?order=desc
    if (order.toLowerCase() === "asc" || order.toLowerCase() === "desc") {
      const queryAllVideosSortedByRating = await database.query(
        `SELECT *
          FROM videos
          ORDER BY rating ${order.toUpperCase()};`
      );
      return res.status(200).json({
        success: true,
        error: false,
        payload: queryAllVideosSortedByRating.rows,
      });
    }

    if (order.toLowerCase() !== "asc" || order.toLowerCase() !== "desc") {
      return res.status(400).json({
        success: false,
        error: true,
        message: "You must choose to sort by either 'asc' or 'desc'",
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

const getVideoById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!parseInt(id)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: `The id '${id}' is not valid, please provide an integer`,
      });
    }

    const queryGetVideoById = await database.query(
      `SELECT *
        FROM videos
        WHERE id = $1;`,
      [id]
    );

    if (queryGetVideoById.rowCount === 0) {
      return res.status(400).json({
        success: false,
        error: true,
        message: `No video with the id ${id} exists.`,
      });
    }

    res
      .status(200)
      .json({ success: true, error: false, payload: queryGetVideoById.rows });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

const addVideo = async (req, res) => {
  try {
    if (!req.body || Object.entries(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Your request has no body",
      });
    }

    // in the html form the "name" attributes are "url" and "title"
    console.log("req.body:", req.body);

    // const { url: videoUrl, title: videoTitle } = req.body;
    const videoUrl = req.body.url;

    if (!videoUrl) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "You must include a video url",
      });
    }

    // if (!videoTitle) {
    //   return res.status(400).json({
    //     success: false,
    //     error: true,
    //     message: "You must include a video title",
    //   });
    // }

    const regexForUrl =
      /^https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}$/;
    if (videoUrl && !regexForUrl.test(videoUrl)) {
      return res.status(400).json({
        success: false,
        error: true,
        message:
          "The format of your video url must be 'https://www.youtube.com/watch?v=(11 characters)",
      });
    }

    // if (videoTitle.length > 100) {
    //   return res.status(400).json({
    //     success: false,
    //     error: true,
    //     message: "Your video title is too long, the maximum is 100 characters",
    //   });
    // }

    const videoId = videoUrl.split("=")[1];

    const queryCheckForDuplicateVideoId = await database.query(
      `SELECT *
        FROM videos
        WHERE videoid = $1
        AND url = $2;`,
      [videoId, videoUrl]
    );
    // console.log("queryCheckForDuplicateVideoId:", queryCheckForDuplicateVideoId);

    if (queryCheckForDuplicateVideoId.rowCount > 0) {
      return res.status(200).json({
        success: false,
        error: true,
        message: `A video already exists in the Database with the URL '${videoUrl}'`,
      });
    }

    // use another api to automatically extract the title
    const response = await fetch(
      `https://noembed.com/embed?dataType=json&url=https://www.youtube.com/watch?v=${videoId}`
    );
    const data = await response.json();
    console.log(data);
    const videoTitle = data.title;

    // Final Sanity Check before INSERT
    // console.log("videoId:", videoId);
    // console.log("videoId.length:", videoId.length);
    // console.log("videoUrl:", videoUrl);
    // console.log("videoUrl.length:", videoUrl.length);
    // console.log("videoTitle:", videoTitle);
    // console.log("videoTitle.length:", videoTitle.length);

    const queryInsertVideo = await database.query(
      `INSERT INTO videos (url, videoid, title)
        VALUES ($1, $2, $3)
        RETURNING id;`,
      [videoUrl, videoId, videoTitle]
    );
    // console.log("queryInsertVideo:", queryInsertVideo);
    const newId = queryInsertVideo.rows[0].id;

    res.status(200).json({
      success: true,
      error: false,
      message: `Video with the id ${newId} created successfully`,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

const updateVideo = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log("id:", id);

    if (!parseInt(id)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: `The id '${id}' is not valid, please provide an integer`,
      });
    }

    const voteType = req.query.vote;
    // console.log("voteType:", voteType);

    if (!voteType || (voteType !== "up" && voteType !== "down")) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "You must choose to vote either 'up' or 'down'",
      });
    }

    const queryGetVideoById = await database.query(
      `SELECT *
      FROM videos
      WHERE id = $1;`,
      [id]
    );
    // console.log("queryGetVideoById:", queryGetVideoById);

    if (queryGetVideoById.rowCount === 0) {
      return res.status(400).json({
        success: false,
        error: true,
        message: `No video with the id ${id} exists to update`,
      });
    }

    const queryUpdateVideoById = await database.query(
      `UPDATE videos
          SET rating = rating ${voteType === "up" ? "+" : "-"} 1
          WHERE id = $1
          RETURNING *;`,
      [id]
    );
    // console.log("queryUpdateVideoById:", queryUpdateVideoById);

    const updatedVideoRecord = queryUpdateVideoById.rows[0];
    // console.log("updatedVideoRecord:", updatedVideoRecord);

    res.status(200).json({
      success: true,
      error: false,
      message: `Video with the id ${id} updated successfully`,
      payload: updatedVideoRecord,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

const toggleFavourite = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log("id:", id);

    if (!parseInt(id)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: `The id '${id}' is not valid, please provide an integer`,
      });
    }

    const queryGetVideoById = await database.query(
      `SELECT *
      FROM videos
      WHERE id = $1;`,
      [id]
    );
    // console.log("queryGetVideoById:", queryGetVideoById);

    if (queryGetVideoById.rowCount === 0) {
      return res.status(400).json({
        success: false,
        error: true,
        message: `No video with the id ${id} exists to update`,
      });
    }

    const queryUpdateVideoById = await database.query(
      `UPDATE videos
          SET favourite = NOT favourite
          WHERE id = $1
          RETURNING *;`,
      [id]
    );
    // console.log("queryUpdateVideoById:", queryUpdateVideoById);

    const updatedVideoRecord = queryUpdateVideoById.rows[0];
    // console.log("updatedVideoRecord:", updatedVideoRecord);

    res.status(200).json({
      success: true,
      error: false,
      message: `Video with the id ${id} updated successfully`,
      payload: updatedVideoRecord,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const id = req.params.id;

    if (!parseInt(id)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: `The id '${id}' is not valid, please provide an integer`,
      });
    }

    const queryGetVideoById = await database.query(
      `SELECT *
        FROM videos
        WHERE id = $1;`,
      [id]
    );
    // console.log("queryGetVideoById:", queryGetVideoById);

    if (queryGetVideoById.rowCount === 0) {
      return res.status(400).json({
        success: false,
        error: true,
        message: `No video with the id ${id} exists to delete`,
      });
    }

    const queryDeleteVideoById = await database.query(
      `DELETE
        FROM videos
        WHERE id = $1;`,
      [id]
    );
    // console.log("queryDeleteVideoById:", queryDeleteVideoById);

    res.status(200).json({
      success: true,
      error: false,
      message: `Video with the id ${id} deleted successfully`,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

module.exports = {
  getAllVideos,
  getVideoById,
  addVideo,
  updateVideo,
  toggleFavourite,
  deleteVideo,
};
