import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import videoRoute from "./routes/videos";
import { Video } from "./models/video";
import data from "./exampleresponse.json";
import { originalDataType } from "./utils/types";
import dotenv from "dotenv";
dotenv.config();
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos: originalDataType[] = data;

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", videoRoute);

const connectToDateBase = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB!);
    app.listen(port, () => {
      console.log("connected to db & listening on post", port);
    });
  } catch (err) {
    console.error(err);
  }
};
const start = async () => {
  try {
    connectToDateBase();
    await Video.deleteMany();
    await Video.create(videos);
  } catch (err) {
    console.error(err);
  }
};

start();
