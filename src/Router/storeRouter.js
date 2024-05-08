import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  searchProducts,
  updateProduct,
} from "../Controllers/storeController.js";
import authMiddleware from "../utils/authMiddleware.js";

export const storeRouter = Router();

  // storeRouter.use(authMiddleware)

storeRouter.get("/", getProducts);
storeRouter.get("/search", searchProducts)
storeRouter.get("/:id", getProductById);
storeRouter.post("/", addProduct);
storeRouter.put("/:id", updateProduct);
storeRouter.delete("/:id", deleteProduct);
