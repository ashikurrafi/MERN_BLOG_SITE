import { Router } from "express";
import {
  createStory,
  deleteStory,
  updateStory,
  getAllStory,
} from "../controllers/storyController.js"; // Ensure this path is correct
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/imageUploader.js";

const router = Router();

router
  .route("/")
  .get(getAllStory)
  .post(protect, upload.single("coverPhoto"), createStory);

router
  .route("/:id")
  .put(protect, upload.single("coverPhoto"), updateStory)
  .delete(protect, deleteStory);

export default router;
