import { Router } from "express";
import {
  addReview,
  deleteReview,
  getReviewById,
  getReviews,
} from "../Controllers/reviewController.js";
import authMiddleware from "../utils/authMiddleware.js";

export const reviewRouter = Router();

// reviewRouter.use(authMiddleware)

reviewRouter.get("/", getReviews);
reviewRouter.get("/:id", getReviewById);
reviewRouter.post("/", addReview);
reviewRouter.delete("/:id", deleteReview);
