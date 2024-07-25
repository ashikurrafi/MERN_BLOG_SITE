import mongoose from "mongoose";
import { Schema } from "mongoose";

const storySchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    coverPhoto: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Story = mongoose.model("Story", storySchema);
