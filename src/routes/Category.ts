import { Router } from "express";
import CategoryController from "../controller/Category";
import authMiddleware from "../middleware/auth";

const router = Router();

router.delete("/api/categories/:id", authMiddleware, CategoryController.delete);

router.put("/api/categories/:id", authMiddleware, CategoryController.update);

router.post("/api/categories", authMiddleware, CategoryController.create);

router.get("/api/categories/:id", authMiddleware, CategoryController.get);

router.get("/api/categories", authMiddleware, CategoryController.getAll);

export default router;
