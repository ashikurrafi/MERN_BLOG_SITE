import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

import { Story } from "../models/storyModel.js";

// Create a story
const createStory = asyncHandler(async (req, res) => {
  const story = new Story({
    title: req.body.title,
    content: req.body.content,
    coverPhoto: req.file.path,
  });

  try {
    const newStory = await story.save();
    res
      .status(201)
      .json(new ApiResponse(201, newStory, "Story created successfully"));
  } catch (err) {
    throw new ApiError(400, err.message);
  }
});

// Update a story
const updateStory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const coverPhoto = req.file ? req.file.path : req.body.coverPhoto;

  try {
    const story = await Story.findById(id);

    if (!story) {
      throw new ApiError(404, "Story not found");
    }

    story.title = title || story.title;
    story.content = content || story.content;
    story.coverPhoto = coverPhoto || story.coverPhoto;

    const updatedStory = await story.save();
    res.json(new ApiResponse(200, updatedStory, "Story updated successfully"));
  } catch (err) {
    throw new ApiError(400, err.message);
  }
});

// Delete a story
const deleteStory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const story = await Story.findById(id);

    if (!story) {
      throw new ApiError(404, "Story not found");
    }

    await story.remove();
    res.json(new ApiResponse(200, null, "Story removed successfully"));
  } catch (err) {
    throw new ApiError(500, err.message);
  }
});

// Get all stories
const getAllStory = asyncHandler(async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(new ApiResponse(200, stories, "Stories fetched successfully"));
  } catch (err) {
    throw new ApiError(500, err.message);
  }
});

export { createStory, updateStory, deleteStory, getAllStory };
