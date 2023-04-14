import { Request, Response } from "express";
import { originalDataType } from "../utils/types";
import { Video } from "../models/video";

// GET "/"
export const getAllVideos = async (req: Request, res: Response) => {
  const sortOrder = req.query.order === "asc" ? 1 : -1;
  const videos = await Video.find({}).sort({ rating: sortOrder });
  return res.status(200).send(videos);
};

export const getVideo = async (req: Request, res: Response) => {
  const video = await Video.findById({ id: +req.params.id });
  if (!video) {
    return res.status(400).json({ error: "Invalid Video" });
  }
  return res.status(200).send(video);
};

export const createVideo = async (req: Request, res: Response) => {
  try {
    const { title, url }: originalDataType = req.body;
    if (!title || !url) {
      return res.status(404).send({
        result: "failure",
        message: "Video could not be saved",
      });
    }
    const allVideos = await Video.find({});
    const generateId = allVideos.length + 1;
    const video = await Video.create({ id: generateId, title, url, rating: 1 });
    return res.status(200).send({ id: generateId });
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({
      result: "failure",
      message: "Internal Server Error",
    });
  }
};
export const deleteVideo = async (req: Request, res: Response) => {
  try {
    const video = await Video.findOneAndDelete({ id: +req.params.id });
    if (!video) {
      return res.status(404).send({
        result: "failure",
        message: "Video could not be deleted",
      });
    }
    res.status(200).send({});
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({
      result: "failure",
      message: "Internal Server Error",
    });
  }
};
