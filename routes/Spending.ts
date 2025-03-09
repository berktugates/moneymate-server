import { Router } from "express";
import authMiddleware from "../middleware/auth";
import SpendingController from "../controller/Spending";
const router = Router();

router.delete("/api/spendings/:id", authMiddleware, SpendingController.delete);

router.put("/api/spendings/:id", authMiddleware, SpendingController.update);

router.post("/api/spendings", authMiddleware, SpendingController.create);

router.get("/api/spendings/:id", authMiddleware, SpendingController.get);

router.get("/api/spendings", authMiddleware, SpendingController.getAll);

export default router;
