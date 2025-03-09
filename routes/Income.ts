import { Router } from "express";
import authMiddleware from "../middleware/auth";
import IncomeController from "../controller/Income";

const router = Router();

router.delete("/api/incomes/:id", authMiddleware, IncomeController.delete);

router.put("/api/incomes/:id", authMiddleware, IncomeController.update);

router.post("/api/incomes", authMiddleware, IncomeController.create);

router.get("/api/incomes/:id", authMiddleware, IncomeController.get);

router.get("/api/incomes", authMiddleware, IncomeController.getAll);

export default router;
