import mongoose from "mongoose";
import { originalDataType } from "../utils/types";
const { Schema } = mongoose;

const videoSchema = new Schema<originalDataType>(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Video = mongoose.model<originalDataType>("videos", videoSchema);
